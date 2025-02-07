import Chat from "../../models/chat";
import genAI from "../../config/geminiConfig";
import { ObjectId } from "mongoose";

export const chatWithGeminiService = async (userId: ObjectId, message: string, role: string) => {
  const userMessage = await Chat.create({
    userId,
    role: role,
    message,
  });

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(message);
  const aiMessage = result.response.text();

  const assistantMessage = await Chat.create({
    userId,
    role: "ASSISTANT",
    message: aiMessage,
  });

  return {
    userMessage,
    assistantMessage,
  };
};
