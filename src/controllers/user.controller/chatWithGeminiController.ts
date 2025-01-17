import { Request, Response } from "express";
import { chatWithGeminiService } from "../../services/user/chatWithGeminiService";

export const chatWithGeminiController = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;
    const role = req.user.role;

    if (!message) {
      return res.status(400).json({ message: "Tin nhắn không được để trống" });
    }

    const aiResponse = await chatWithGeminiService(userId, message, role);

    return res.status(200).json({
      success: true,
      data: aiResponse,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Đã xảy ra lỗi" });
  }
};
