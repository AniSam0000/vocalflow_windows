import express from "express";
import multer from "multer";
import cors from "cors";
import { getBalanceDeepgram, transcribeAudio } from "./deepgram.js";
import { getBalanceGrok, improveText } from "./grok.js";

const app = express();
const upload = multer();

// Middleware to parse JSON and URL-encoded data
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Balance route
app.get("/balances", async (req, res) => {
  const deepgram = await getBalanceDeepgram();
  const groq = await getBalanceGrok();
  res.json({ deepgram, groq });
});

// Transcription route
app.post("/transcribe", upload.single("audio"), async (req, res) => {
  try {
    // Step 1 — Get audio buffer from request
    const audioBuffer = req.file.buffer;

    // Step 2 send to Deepgram
    const rawText = await transcribeAudio(audioBuffer);
    // console.log("Deepgram result:", rawText);

    // Step 3
    const improvedText = await improveText(rawText);
    // console.log("Groq result:", improvedText);

    // Step 4 send it to the browser
    res.json({ raw: rawText, text: improvedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Transcription failed" });
  }
});

export default app;
