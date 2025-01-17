import WishList from "../../models/wishList";
export const getMyWishListService = async (userId: string) => {
  try {
    const wishList = await WishList.findOne({ user: userId })
      .populate({
        path: 'items',
        select: 'courseName slug price rating discount poster',
      });

    if (!wishList) {
      throw new Error("Wishlist not found");
    }

    return wishList;
  } catch (error) {
    throw new Error(error.message);
  }
};
