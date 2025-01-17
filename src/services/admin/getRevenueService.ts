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
          totalOrders: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    const revenueByMonth = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0
    };

    paidOrders.forEach((item) => {
      const monthIndex = item._id;
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const monthName = monthNames[monthIndex - 1];
      revenueByMonth[monthName] = item.totalRevenue;
    });

    return revenueByMonth;
  } catch (error) {
    throw new Error(`Error fetching paid orders: ${error.message}`);
  }
};
