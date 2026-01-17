# 👻 Ghostwriter

High-Fidelity Study Extraction Engine
🔗 Live app: https://ghostwriter1.vercel.app/

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

Technology Stack
-Frontend : Next.js – Used for building a fast, SEO-friendly React-based frontend
React – Component-based UI for better maintainability
Tailwind CSS (or custom CSS if applicable) – For clean and responsive styling

-Backend
Next.js API Routes – Lightweight backend handling AI requests
Node.js – Runtime environment for server-side logic

-AI Integration
Large Language Model API – Powers the core text generation and writing assistance features

-Deployment
Vercel – Used for seamless deployment, hosting, and environment management

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

