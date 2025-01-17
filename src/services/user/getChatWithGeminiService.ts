import { ObjectId } from "mongoose";
import Chat from "../../models/chat";

export const getChatWithGeminiService = async (id: ObjectId) => {
  try {
    const chat = await Chat.find({ userId: id });
    if (!chat) {
      throw new Error('Hãy bắt đầu chat với Gemini');
    }
    return chat;
  } catch (err) {
    throw new Error(err);
  }
}
