import Cart from "../../models/cart";
import Course from "../../models/course";

export const toggleCourseInCartService = async (userId: string, courseId: string) => {
  try {
    const course = await Course.findById(courseId);

    if (!course) {
      throw new Error("Course not found");
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [courseId] });
      await cart.save();
      return { action: "added", cart };
    }

    const courseIndex = cart.items.findIndex(
      (item) => item.toString() === courseId
    );

    if (courseIndex !== -1) {
      cart.items.splice(courseIndex, 1);
      await cart.save();
      return { action: "removed", cart };
    } else {
      cart.items.push(courseId);
      await cart.save();
      return { action: "added", cart };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
