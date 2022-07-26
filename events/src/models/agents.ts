import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current'

interface AgentAttrs {
  id: string;
  userName:string;
  isMax: boolean;

}

interface AgentDoc extends mongoose.Document {
    id: string;
    userName:string;
    isMax: boolean;
}

interface AgentModel extends mongoose.Model<AgentDoc> {
  build(attrs: AgentAttrs): AgentDoc;
}

const agentSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    isMax: {
      type: Boolean,
      required: true,
      default: false,
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
agentSchema.set('versionKey','version');
// agentSchema.plugin(updateIfCurrentPlugin);

agentSchema.statics.build = (attrs: AgentAttrs) => {
  return new Agent({
    _id: attrs.id,
    userName: attrs.userName,
    isMax: attrs.isMax,
  });
};

const Agent = mongoose.model<AgentDoc, AgentModel>('agent', agentSchema);

export { Agent };