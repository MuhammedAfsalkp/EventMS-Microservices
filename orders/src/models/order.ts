import mongoose from 'mongoose';
import { OrderStatus } from '@iyaa-eventms/common';
import { EventDoc } from './event';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

export { OrderStatus };

interface OrderAttrs {
  userId: string;
  userName: string;
  status: OrderStatus;
  expiresAt: Date;
  event: EventDoc;
  agentId: string;
}

interface OrderDoc extends mongoose.Document {
  userId: string;
  userName: string;
  status: OrderStatus;
  expiresAt: Date;
  event: EventDoc;
  version: number;
  agentId: string;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    agentId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

orderSchema.set('versionKey','version');
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };