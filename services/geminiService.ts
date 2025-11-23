import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const apiKey = process.env.API_KEY || '';

class GeminiService {
  private ai: GoogleGenAI;
  private chat: Chat | null = null;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey });
  }

  public async startChat() {
    this.chat = this.ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: 'You are a helpful and sophisticated concierge for Gucci. You speak with elegance, brevity, and a touch of Italian flair. You assist customers with product inquiries, styling advice, and brand history.',
      },
    });
  }

  public async sendMessage(message: string): Promise<string> {
    if (!this.chat) {
      await this.startChat();
    }
    
    try {
        if (!this.chat) throw new Error("Chat not initialized");
        
        const response: GenerateContentResponse = await this.chat.sendMessage({ message });
        return response.text || "I apologize, but I cannot answer that at the moment.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "I am currently unable to connect to the styling network. Please try again later.";
    }
  }
}

export const geminiService = new GeminiService();
