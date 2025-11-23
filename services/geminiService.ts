// Mock service for Vercel deployment stability.
// Replaces the Google GenAI SDK to prevent build errors with missing API keys or package versions.

export const sendMessageToGemini = async (
  _message: string,
  _history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return static concierge response
  return "I apologize, but the AI concierge service is currently undergoing scheduled maintenance. Please contact the coordinator for immediate assistance with your retrieval.";
};