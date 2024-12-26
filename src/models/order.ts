import mongoose, { Schema } from 'mongoose';
import { PAYMENT_STATUS } from './type';

const OrderSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        course: {
          type: Schema.Types.ObjectId,
          ref: 'Course',
          required: true
        },
        price: {
          type: Number,
          required: true
        },
        discount: {
          type: Number,
          default: 0
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true
    },
    paymentStatus: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.PENDING,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('Order', OrderSchema);
