import Cart from "../../models/cart";
export const getMyCartService = async (userId: string) => {
  try {
    const cart = await Cart.findOne({ user: userId })
      .populate({
        path: 'items',
        select: 'courseName slug price rating discount poster',
      });

    if (!cart) {
      throw new Error("Cart not found");
    }

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};
