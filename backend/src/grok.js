import Groq from "groq-sdk";
import { GROQ_API_KEY } from "../config/keys.js";

const groq = new Groq({ apiKey: GROQ_API_KEY });

export const getBalanceGrok = async () => {
  try {
    const models = await groq.models.list();
    if (models) {
      // console.log("Free Tier Active");

      return "Free Tier Active ✓";
    }
    return "Not Connected";
  } catch (error) {
    console.error(error.message);
  }
};

// Function to improve text using Groq's language model
export const improveText = async (text) => {
  if (!text) return "No text provided";
  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `Fix grammar and improve this dictated text, return only the improved text nothing else: ${text}`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error(error.message);
    return text;
  }
};
