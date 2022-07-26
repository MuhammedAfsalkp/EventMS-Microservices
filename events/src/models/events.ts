import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

interface EventAttrs {
  title: string;
  description:string;
  price: number;
  agentId: string;
  address: string;
  image: string;

}

interface EventDoc extends mongoose.Document {
  title: string;
  description: string;
  price: number;
  agentId: string;
  address: string;
  version: number;
  image: string;
  orderId?: string;
}

interface EventModel extends mongoose.Model<EventDoc> {
  build(attrs: EventAttrs): EventDoc;
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
    },
    agentId: {
      type: String,
      required: true,
    },
    description:  {
      type: String, 
     required: true 
   },
    address:  {
       type: String, 
      required: true 
    },
    orderId: {
      type: String,
    },
    image: { type: String,
       required: false
       },
    
    // location: {
    //   lat: { type: Number, required: true },
    //   lng: { type: Number, required: true }
    // }
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

eventSchema.statics.build = (attrs: EventAttrs) => {
  return new Event(attrs);
};

const Event = mongoose.model<EventDoc, EventModel>('event', eventSchema);

export { Event };
