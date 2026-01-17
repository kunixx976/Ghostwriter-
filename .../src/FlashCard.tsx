"use client";
interface FlashcardProps {
    question: string;
    answer: string;
}

export default function Flashcard({ question, answer }: FlashcardProps) {
    return (
        <div className="p-4 rounded-xl bg-slate-900 shadow-md border border-white/10">
            <h4 className="font-semibold text-white mb-2">{question}</h4>
            <p className="text-slate-400 text-sm">{answer}</p>
        </div>
    );
}
