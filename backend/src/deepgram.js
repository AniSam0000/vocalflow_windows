import { DeepgramClient } from "@deepgram/sdk";
import { DEEPGRAM_API_KEY, DEEPGRAM_PROJECT_ID } from "../config/keys.js";

// Function to transcribe audio using Deepgram's API
export const transcribeAudio = async (audioBuffer) => {
  const deepgram = new DeepgramClient({ apiKey: DEEPGRAM_API_KEY });

  const result = await deepgram.listen.v1.media.transcribeFile(audioBuffer, {
    model: "nova-3",
    language: "en",
    smart_format: true,
  });

  return result.results.channels[0].alternatives[0].transcript ?? "";
};

// Get balance
export const getBalanceDeepgram = async () => {
  const url = `https://api.deepgram.com/v1/projects/${DEEPGRAM_PROJECT_ID}/balances`;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Token ${DEEPGRAM_API_KEY}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    // console.log("This is the data part");
    // console.log(`The balance is ${data.balances[0].amount}`);

    return data.balances[0].amount;
  } catch (error) {
    console.error(error);
  }
};
