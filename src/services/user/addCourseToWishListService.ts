import Course from "../../models/course";
import WishList from "../../models/wishList";

export const addCourseToWishListService = async (userId: string, courseId: string) => {
  try {
    const course = await Course.findById(courseId);

    if (!course) {
      throw new Error("Course not found");
    }

    let cart = await WishList.findOne({ user: userId });

    if (!cart) {
      cart = new WishList({ user: userId, items: [courseId] });
    } else {
      const isCourseInWishList = cart.items.some(
        (item) => item.toString() === courseId
      );

      if (!isCourseInWishList) {
        cart.items.push(courseId);
      }
    }

    await cart.save();
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};


