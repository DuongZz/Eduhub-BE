import { ObjectId } from "mongoose";
import Course from "../../models/course";
import WishList from "../../models/wishList";

export const toggleCourseInWishListService = async (userId: ObjectId, courseId: string) => {
  try {
    const course = await Course.findById(courseId);

    if (!course) {
      throw new Error("Course not found");
    }

    let wishList = await WishList.findOne({ user: userId });

    if (!wishList) {
      wishList = new WishList({ user: userId, items: [courseId] });
      await wishList.save();
      return { action: "added", wishList };
    }

    const courseIndex = wishList.items.findIndex(
      (item) => item.toString() === courseId
    );

    if (courseIndex !== -1) {
      wishList.items.splice(courseIndex, 1);
      await wishList.save();
      return { action: "removed", wishList };
    } else {
      wishList.items.push(courseId);
      await wishList.save();
      return { action: "added", wishList };
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
