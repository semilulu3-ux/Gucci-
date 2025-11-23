// Service adapted to run without @google/genai SDK to prevent build errors.
// Currently returns a static response to ensure the app functions on Vercel.

export const sendMessageToGemini = async (
  message: string,
  history: { role: string; parts: { text: string }[] }[]
): Promise<string> => {
  // Simulate a short network delay for realism
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return a fallback message since the AI SDK has been removed
  return "I apologize, but the AI concierge service is currently undergoing scheduled maintenance. Please contact the coordinator for immediate assistance with your retrieval.";
};