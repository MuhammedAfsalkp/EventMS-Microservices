import mongoose from 'mongoose';
import { Order, OrderStatus } from './order';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

interface EventAttrs {
  id: string;
  title: string;
  price: number;
  agentId: string;
  image: string;
}

export interface EventDoc extends mongoose.Document {
  title: string;
  price: number;
  agentId: string;
  version : number;
  image: string;
  isReserved(): Promise<boolean>;
}

interface EventModel extends mongoose.Model<EventDoc> {
  build(attrs: EventAttrs): EventDoc;
  isReserved(): Promise<boolean>;
  findByEvent(event: {id: string, version: number}): Promise<EventDoc | null>
}

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    agentId: {
        type: String,
        required: true,
      },
      image: { 
        type: String,
        required: false
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

eventSchema.set('versionKey','version');
eventSchema.plugin(updateIfCurrentPlugin);

eventSchema.statics.findByEvent = (event: {id: string, version: number}) => {
  return Event.findOne({
    _id: event.id,
    version: event.version - 1
  });
}

eventSchema.statics.build = (attrs: EventAttrs) => {
  return new Event({
    _id: attrs.id,
    title: attrs.title,
    image: attrs.image,
    price: attrs.price,
    agentId: attrs.agentId,
  });
};
eventSchema.methods.isReserved = async function () {
  console.log("is reserved")
  // this === the event document that we just called 'isReserved' on
  const existingOrder = await Order.findOne({
    event: this as any,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });
  console.log("test",existingOrder)

  return !!existingOrder;
};

const Event = mongoose.model<EventDoc, EventModel>('Event', eventSchema);

export { Event };