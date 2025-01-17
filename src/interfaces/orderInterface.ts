import mongoose, { Document } from 'mongoose';
import { PAYMENT_STATUS } from '../models/type';

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  items: {
    course: mongoose.Types.ObjectId;
    price: number;
    discount: number;
  }[];
  totalAmount: number;
  paymentStatus: PAYMENT_STATUS;
  createdAt: Date;
}
