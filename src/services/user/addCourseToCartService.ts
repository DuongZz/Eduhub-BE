import mongoose from "mongoose";
import Cart from "../../models/cart";
import Course from "../../models/course";

export const addToCartService = async (userId: string, courseId: string) => {
  try {
    const course = await Course.findById(courseId);

    if (!course) {
      throw new Error("Course not found");
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [courseId] });
    } else {
      const isCourseInCart = cart.items.some(
        (item) => item.toString() === courseId
      );

      if (!isCourseInCart) {
        cart.items.push(courseId);
      }
    }

    await cart.save();
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};


