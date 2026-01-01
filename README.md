# FreelancePolish — Freelance Communication Assistant (repo: `freelauncer_translator`)

_A small, focused tool to help Urdu/Roman-Urdu speaking freelancers write professional, client-ready English messages — powered by modern LLMs._

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Gemini API](https://img.shields.io/badge/Google_Gemini_Pro-4285F4?logo=google)](https://ai.google.dev/)

## 🚀 Project Overview

**Freelance Polish** is a specialized communication tool designed for freelancers from Urdu-speaking regions (primarily Pakistan) who work with English-speaking clients on platforms like Upwork, Fiverr, and direct contracts.

The biggest barrier for many talented developers, designers, and writers is not their skill — it's clear, professional English communication. This app solves that by:

- Accurately translating English ↔ Urdu
- Understanding freelance-specific jargon, slang, and context
- Detecting emotional tone and suggesting respectful alternatives
- Rephrasing Urdu-to-English messages to sound **native, polite, professional, and friendly**
- Providing real-time previews before sending to clients

Built with modern web technologies and powered by **Google Gemini Pro** for state-of-the-art natural language understanding.

## ✨ Key Features

- **Bidirectional Translation** (English ↔ Urdu) with context awareness
- **Smart Rephrasing** – Makes your English messages sound natural and client-friendly
- **Freelance Jargon Support** – Handles terms like "scope creep", "milestone", "revision", "deliverables"
- **Tone Adjustment** – Softens frustration, adds politeness, preserves enthusiasm
- **Real-time Preview** – See the improved English version before sending
- **Local Customization** – Extendable JSON database for domain-specific terms and phrases
- **Clean, Responsive UI** – Built with Tailwind CSS and React
- **Privacy-First** – All processing happens server-side; no message logging

## 🛠 Tech stack

| Technology               | Purpose                                     |
| ------------------------ | ------------------------------------------- |
| **Next.js** (v16.1.1)    | Full-stack framework (App Router)           |
| **React** (v19.2.3)      | Component-based UI                          |
| **Tailwind CSS**         | Modern, responsive styling                  |
| **Google Generative AI** | Gemini/Bison integration helpers            |
| **TypeScript**           | Type safety and better developer experience |
| **Vercel**               | Recommended deployment platform             |

## 📦 Installation & Setup

### Prerequisites

- Node.js 18 or higher
- A Google account with **Gemini Pro** access (via Google AI Studio or Gemini Advanced subscription)
- Git

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/UmarRana2005/freelance-polish.git
   cd freelance-polish
   ```

Install dependencies

```bash
npm install
```

Set up environment variables by creating a `.env.local` at the project root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
# Optional: GEMINI_MODEL_NAME=gemini-3-flash-preview
```

Run the development server:

```bash
npm run dev
# Open http://localhost:3000
```

🚀 Deployment
The easiest way to deploy is with Vercel:
Deploy with Vercel
Just connect your repo, add the GEMINI_API_KEY in Vercel dashboard → Settings → Environment Variables, and deploy!

## 📂 Project structure

This repository follows a focused, App Router-based Next.js layout (no `src/` directory in this project — app files live at the repo root).

```
freelauncer_translator/
├── app/
│   ├── api/
│   │   └── freelauncer_helper/route.ts    # LLM-powered endpoint
│   ├── page.tsx                          # Main UI
│   └── ...                               # pages (about, replies, test, validate)
├── components/                           # React components & `ui/` primitives
├── lib/                                  # prompts, helpers (prompts.ts, utils.ts)
├── public/                               # static assets and icons
├── scripts/                              # helper scripts (list_models.js)
├── types/                                # TypeScript response types
├── package.json                          # deps & scripts
├── next.config.ts
├── tsconfig.json
└── README.md
```

> Note: UI mock images (e.g., `UI_freelance_polish.png`) and plain `.txt` files in the repo are non-essential to functionality — you can ignore them.

🤝 Contributing
Contributions are welcome! Feel free to:

Open issues for bugs or feature requests
Submit pull requests with improvements
Suggest new jargon or cultural communication tips

Please follow standard GitHub flow and include clear descriptions.
📄 License
This project is licensed under the MIT License – see LICENSE for details.
💙 Acknowledgements

Powered by Google Gemini Pro for exceptional multilingual understanding
Inspired by the thousands of talented Pakistani freelancers breaking barriers every day
Built with love for the global freelance community ❤️

Freelance Polish – Because great ideas shouldn't be lost in translation.
Made with 🇵🇰 heart and 🌍 ambition.
