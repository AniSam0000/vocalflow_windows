# VocalFlow for Windows

A voice-to-text desktop application for Windows that transcribes your speech using Deepgram and improves the result using Groq AI. Built with Node.js and Express.

---

## What It Does

- 🎤 Record your voice by pressing F9
- 📡 Sends audio to Deepgram for transcription
- 🤖 Groq AI improves the transcribed text
- 💰 Displays Deepgram and Groq account balances
- 🌐 Runs on localhost:3000 in your browser

---

## Tech Stack

- Node.js
- Express.js
- Deepgram SDK (Speech to Text)
- Groq SDK (AI Text Improvement)
- Vanilla JS + HTML + CSS (Frontend)

---

## Project Structure

```
vocalflow-windows/
├── config/
│ └── keys.js ← API keys (not pushed to GitHub)
├── src/
│ ├── app.js ← Express routes
│ ├── deepgram.js ← Deepgram transcription + balance
│ └── groq.js ← Groq AI improvement + balance
├── public/
│ ├── index.html ← Frontend UI
│ ├── style.css ← Styles
│ └── work.js ← Recording + fetch logic
├── server.js ← Entry point
├── .gitignore
└── README.md
```

---

## Prerequisites

- Node.js v18 or higher
- A Deepgram account → [deepgram.com](https://deepgram.com)
- A Groq account → [console.groq.com](https://console.groq.com)

---

## Setup & Installation

### 1. Clone the repository

```bash
git clone <repo name>
cd vocalflow-windows
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your API keys


```js
export const DEEPGRAM_API_KEY = "your_deepgram_api_key_here";
export const DEEPGRAM_PROJECT_ID = "your_deepgram_project_id_here";
export const GROQ_API_KEY = "your_groq_api_key_here";
```

#### How to get your Deepgram API key:

1. Go to [deepgram.com](https://deepgram.com) and sign up
2. Go to API Keys → Create a new key
3. Go to Project & Team → copy your Project ID

#### How to get your Groq API key:

1. Go to [console.groq.com](https://console.groq.com) and sign up
2. Go to API Keys → Create a new key

### 4. Run the app

```bash
npm start
```

### 5. Open in browser

http://localhost:3000

---

## How To Use

| Key | Action                        |
| --- | ----------------------------- |
| F9  | Start recording               |
| F10 | Stop recording and transcribe |

1. Open `http://localhost:3000` in your browser
2. Allow microphone access when prompted
3. Press **F9** to start recording
4. Speak clearly into your microphone
5. Press **F10** to stop
6. Deepgram transcribes your speech
7. Groq AI improves the text
8. Result appears in the Last Result section

---

## Features

- Real time balance display for Deepgram and Groq
- Deepgram Nova-3 model for accurate transcription
- Groq Llama 3.3 70B model for grammar improvement
- Clean status indicator (Ready / Recording / Processing)
- Works entirely in the browser — no extra installs needed

---

## Notes

- The ZIP file submitted includes `config/keys.js` for testing
- Do not share your API keys publicly
- Groq free tier is used — no billing required

---

## License

MIT
