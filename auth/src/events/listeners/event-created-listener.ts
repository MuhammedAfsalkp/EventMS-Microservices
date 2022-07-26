import { Message,Stan } from "node-nats-streaming";
import { Subjects,Listener,EventCreatedEvent } from "@iyaa-eventms/common";
import { User } from "../../models/user";
import { queueGroupName } from "./queue-group-name";


export class EventCreatedListener extends Listener<EventCreatedEvent> {
    subject: Subjects.EventCreated = Subjects.EventCreated;
    queueGroupName = queueGroupName;
    constructor(client:Stan){
        console.log("listening for event:created");
        super(client);
    }

    async onMessage(data: EventCreatedEvent['data'], msg: Message){
        const { isMax,agentId } = data;
        console.log(data);
        const result = await User.findOneAndUpdate({_id:agentId},{$set:{isMax:true}},{new:true})
        console.log("updated auth max",result)
        // const user = Event.build({ id,title,price,agentId,image});
        // await event.save();

        msg.ack();
   
    }

}