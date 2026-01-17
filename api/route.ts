import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import officeParser from "officeparser";
import { Buffer } from "buffer";

// officeparser handles PDF, DOCX, PPTX, XLSX, etc. natively
// No need for pdf-parse which often has canvas dependency issues in Next.js

export const runtime = "nodejs";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
    console.time("TotalRequest");

    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = file.name.toLowerCase();
        let extractedText = "";

        /* ---------------- 1. ROBUST FILE EXTRACTION ---------------- */
        console.time("FileParsing");
        try {
            if (fileName.endsWith('.pdf') || fileName.match(/\.(docx|pptx|ppt|xlsx)$/)) {
                // officeparser handles PDF natively since version 4+
                extractedText = await officeParser.parseOfficeAsync(buffer);
            } else if (file.type.startsWith("text/") || fileName.endsWith('.txt')) {
                extractedText = buffer.toString("utf-8");
            }

            if (!extractedText || extractedText.trim().length < 10) {
                throw new Error("File content is too short or unreadable.");
            }
        } catch (parseErr) {
            console.error("Extraction Error:", parseErr);
            return NextResponse.json({ error: "Could not read file content." }, { status: 422 });
        }
        console.timeEnd("FileParsing");

        /* ---------------- 2. GEMINI STREAMING ---------------- */
        console.time("AIGeneration");
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            systemInstruction: "You are an 'Academic Ghostwriter'. Refine the user's material into high-level academic prose. Return only clear, structured, and premium academic content."
        });

        const result = await model.generateContentStream({
            contents: [
                {
                    role: "user",
                    parts: [{ text: `Analyze and rewrite this: \n\n ${extractedText.slice(0, 50000)}` }]
                }
            ],
        });

        /* ---------------- 3. TRANSFORM STREAM FOR CLIENT ---------------- */
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    for await (const chunk of result.stream) {
                        const content = chunk.text();
                        if (content) {
                            const payload = `data: ${JSON.stringify({ chunk: content, done: false })}\n\n`;
                            controller.enqueue(encoder.encode(payload));
                        }
                    }
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true })}\n\n`));
                    console.timeEnd("AIGeneration");
                    console.timeEnd("TotalRequest");
                    controller.close();
                } catch (streamErr) {
                    controller.error(streamErr);
                }
            },
        });

        return new Response(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });

    } catch (err: any) {
        console.error("Ghostwriter Error:", err);
        return NextResponse.json(
            { error: "Internal Server Error", details: err.message },
            { status: 500 }
        );
    }
}
