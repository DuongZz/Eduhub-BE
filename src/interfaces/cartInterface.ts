import { Document, Schema, Types } from 'mongoose';

export interface ICart extends Document {
  user: Schema.Types.ObjectId;
  items: Schema.Types.ObjectId[];
}
