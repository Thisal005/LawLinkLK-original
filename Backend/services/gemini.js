import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateGeminiResponse = async (userPrompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(userPrompt);
    const response = result.response;
    return response.text(); // Extracts the text response
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    return "Error generating response.";
  }
};
