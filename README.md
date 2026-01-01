# Freelance Polish – Smart English-Urdu Communication Assistant

![Banner](https://via.placeholder.com/1200x600.png?text=Freelance+Polish+-+Break+the+Language+Barrier)  
_Empowering Urdu-speaking freelancers to communicate confidently with international clients_

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15.0-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
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

## 🛠 Tech Stack

| Technology                | Purpose                                            |
| ------------------------- | -------------------------------------------------- |
| **Next.js 15**            | Full-stack framework (App Router)                  |
| **React 18**              | Component-based UI                                 |
| **Tailwind CSS**          | Modern, responsive styling                         |
| **Google Gemini Pro API** | Advanced translation, rephrasing & tone adjustment |
| **TypeScript**            | Type safety and better developer experience        |
| **Vercel**                | Recommended deployment platform                    |

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

Install dependenciesBashnpm install
Set up environment variables
Create a .env.local file in the root:envGEMINI_API_KEY=your_gemini_api_key_hereGet your key from: https://aistudio.google.com/app/apikey
Run the development serverBashnpm run devOpen http://localhost:3000 to view the app.

🚀 Deployment
The easiest way to deploy is with Vercel:
Deploy with Vercel
Just connect your repo, add the GEMINI_API_KEY in Vercel dashboard → Settings → Environment Variables, and deploy!

📂 Project Structure
freelance-polish/
├── app/
│ ├── api/
│ │ └── translate-and-rephrase/ # Gemini-powered endpoint
│ ├── components/ # Reusable React components
│ └── page.tsx # Main UI
├── public/
├── .env.local # Your Gemini API key
├── next.config.js
├── tailwind.config.ts
└── README.md

🔧 Customization
Want to add more freelance terms or niche-specific phrases?
Edit the JSON files in /data/:

jargons.json
slang.json
templates.json

Or enhance the Gemini prompt in the API route for even smarter behavior.
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
