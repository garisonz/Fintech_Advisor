import { GoogleGenerativeAI } from "@google/generative-ai";

interface ChatMessage {
  content: string;
  isBot: boolean;
  timestamp: Date;
  id: string;
}

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

if (!apiKey) {
  throw new Error("Missing GOOGLE_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const geminiModel = genAI.getGenerativeModel({ 
  model: "gemini-pro",
  generationConfig: {
    maxOutputTokens: 1000,
    temperature: 0.7,
  },
});

export const getChatResponse = async (message: string, chatHistory: ChatMessage[] = []) => {
  try {
    console.log('Starting chat with message:', message);
    console.log('Chat history length:', chatHistory.length);

    const systemPrompt = `You are a helpful and knowledgeable financial advisor chatbot. 
    Your role is to assist users with financial questions and advice.`;

    const chat = geminiModel.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [{ text: "I understand my role as a financial advisor chatbot." }],
        },
        ...chatHistory.map(msg => ({
          role: msg.isBot ? "model" : "user",
          parts: [{ text: msg.content }],
        })),
      ],
    });

    console.log('Sending message to Gemini');
    const result = await chat.sendMessage([{ text: message }]);
    console.log('Received response from Gemini');
    
    const response = await result.response;
    const responseText = response.text();
    console.log('Response text:', responseText);
    
    return responseText;
  } catch (error) {
    console.error('Error in getChatResponse:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
};