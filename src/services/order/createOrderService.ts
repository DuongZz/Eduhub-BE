import Order from '../../models/order';
import Course from '../../models/course';
import Cart from '../../models/cart';

export const createOrderService = async (userId: string, courseIds: string[]) => {
  try {
    const courses = await Course.find({ _id: { $in: courseIds } });

    if (!courses.length) {
      throw new Error('No valid courses found.');
    }

    let totalAmount = 0;
    const items = courses.map((course) => {
      const discountAmount = (course.price * (course.discount || 0)) / 100;
      const finalPrice = course.price - discountAmount;
      totalAmount += finalPrice;
      return {
        course: course._id,
        courseName: course.courseName,
        slug: course.slug,
        price: course.price,
        discount: course.discount || 0,
      };
    });

    const newOrder = new Order({
      user: userId,
      items,
      totalAmount,
      paymentStatus: 'Pending',
    });

    // Xóa các khóa học khỏi giỏ hàng
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      throw new Error("Cart not found.");
    }

    // Loại bỏ các khóa học đã đặt hàng khỏi giỏ hàng
    cart.items = cart.items.filter(
      (cartItem) => !courseIds.includes(cartItem.toString())
    );

    await newOrder.save();
    return newOrder;
  } catch (error) {
    throw new Error(`Failed to create order: ${error.message}`);
  }
};
