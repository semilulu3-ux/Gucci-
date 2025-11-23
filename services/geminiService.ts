import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Ensure API key is available
const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const sendMessageToGemini = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `You are a sophisticated, polite, and knowledgeable concierge for a luxury fashion house called "The Icons". 
    Your tone is elegant, minimalist, and helpful. 
    You are assisting a client who is viewing a rare "Bamboo 1947" handbag.
    The client is on a page with a 5-minute reservation timer. 
    Encourage them to complete their inquiry before the timer expires.
    Keep answers concise (under 50 words) and haughtily polite.`;

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: systemInstruction,
      },
      history: history,
    });

    const response: GenerateContentResponse = await chat.sendMessage({
      message: message,
    });

    return response.text || "I apologize, but I cannot respond at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Our concierge service is momentarily unavailable.";
  }
};
