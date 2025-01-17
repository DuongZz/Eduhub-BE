import { Document, Schema } from 'mongoose';

export interface IWishList extends Document {
  user: Schema.Types.ObjectId;
  items: Schema.Types.ObjectId[];
}
