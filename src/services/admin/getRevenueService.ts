import Order from '../../models/order';

export const getRevenueService = async (year: number) => {
  try {
    const paidOrders = await Order.aggregate([
      {
        $match: {
          paymentStatus: 'Paid',
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          totalRevenue: { $sum: '$totalAmount' },
          totalOrders: { $sum: 1 },
          totalCourses: { $sum: { $size: '$items' } }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    const revenueByMonth = {
      January: { revenue: 0, orders: 0, courses: 0 },
      February: { revenue: 0, orders: 0, courses: 0 },
      March: { revenue: 0, orders: 0, courses: 0 },
      April: { revenue: 0, orders: 0, courses: 0 },
      May: { revenue: 0, orders: 0, courses: 0 },
      June: { revenue: 0, orders: 0, courses: 0 },
      July: { revenue: 0, orders: 0, courses: 0 },
      August: { revenue: 0, orders: 0, courses: 0 },
      September: { revenue: 0, orders: 0, courses: 0 },
      October: { revenue: 0, orders: 0, courses: 0 },
      November: { revenue: 0, orders: 0, courses: 0 },
      December: { revenue: 0, orders: 0, courses: 0 }
    };

    paidOrders.forEach((item) => {
      const monthIndex = item._id;
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const monthName = monthNames[monthIndex - 1];
      revenueByMonth[monthName] = {
        revenue: item.totalRevenue,
        orders: item.totalOrders,
        courses: item.totalCourses
      }
    });
    const totalYearlyRevenue = paidOrders.reduce((sum, item) => sum + item.totalRevenue, 0);


    return { revenueByMonth, totalYearlyRevenue };
  } catch (error) {
    throw new Error(`Error fetching paid orders: ${error.message}`);
  }
};
