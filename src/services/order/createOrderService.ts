import Order from '../../models/order';
import Course from '../../models/course';

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

    await newOrder.save();
    return newOrder;
  } catch (error) {
    throw new Error(`Failed to create order: ${error.message}`);
  }
};
