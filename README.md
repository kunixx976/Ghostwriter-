# 👻 Ghostwriter

High-Fidelity Study Extraction Engine

Ghostwriter is a production-grade academic distillation engine that transforms lecture materials—textbooks, slides, and recordings—into structured, exam-ready "Master Guides" with minimal manual effort. Upload study materials and get concise, prioritized study content that helps you learn faster and remember more.

---

## ✨ Key Features

- 🚀 Intelligent Processing: Extract and synthesize text from PDFs, PPTX, DOCX, images, and more for high-quality outputs.
- ✍️ AI-Assisted Writing: Expand, reorganize, and rephrase notes into clean, exam-focused content.
- 🧠 Context-Aware Outputs: Responses prioritize relevance and clarity over generic filler.
- 🎴 Smart Flashcards: Convert materials into interactive flashcards for rapid revision.
- ⚡ Fast & Responsive: Optimized for quick responses and a smooth UI across devices.
- 🔐 Privacy-First: Stateless processing where inputs are not stored permanently unless explicitly configured.
- 🎯 Clean, Minimal UI: Distraction-free interface designed around focused study sessions.
- 💎 Premium Design: Modern, responsive visuals with dark mode and subtle motion.

---

## 🛠️ Technology Stack

- Framework: Next.js (App Router)
- Frontend: React with Tailwind CSS (or custom styling where needed)
- Animations: Framer Motion (optional)
- Icons: Lucide / Heroicons
- Backend: Next.js API routes / Node.js
- AI Engine: Large language model API (Gemini / compatible LLM)
- Parsing: Office/PDF parsing libraries (for PPTX, DOCX, PDF extraction)
- Deployment: Vercel (recommended)

---

## 🚀 Getting Started

1. Clone the repository
```bash
git clone https://github.com/kunixx976/Ghostwriter-.git
cd Ghostwriter-
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables  
Create a `.env.local` file in the project root and add:
```env
GEMINI_API_KEY=your_gemini_api_key_here
# or: LLM_API_KEY=your_api_key_here
```
Keep this file private and never commit it to version control.

4. Run the development server
```bash
npm run dev
```
Open http://localhost:3000 in your browser.

---

## 📂 Project Structure (high level)

- app/ or pages/ — Next.js application routes and pages
- app/api/ghostwriter/route.ts — Core AI streaming / API route (where the model is called)
- src/components/ — Reusable UI components (Bento cards, flashcards, editor, etc.)
- public/ — Static assets
- app/globals.css or src/styles/ — Theme tokens, Tailwind config, and custom CSS

(Adjust paths above if your repo uses a different layout.)

---

## 🎨 Design Philosophy

- Simplicity First — Features exist to support studying, not to distract.
- Human-Centered AI — AI assists and amplifies user thought; it does not replace it.
- Speed & Focus — Minimal interface and fast interactions to keep users in the flow.
- Privacy by Default — Stateless processing where possible; do not store user inputs unless needed.
- Practical Over Flashy — Prioritize reliability, clarity, and usefulness over gimmicks.

---

## 📌 Notes & Tips

- If you plan to deploy to Vercel, add environment variables in the Vercel dashboard rather than committing them to the repo.
- For better parsing of slide decks and PDFs, include robust error handling and fallback extractors.
- Consider adding an examples/ folder with sample input files and expected outputs for testing.

---

“Distilling lecture noise into exam-day clarity.”
