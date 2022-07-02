import { Message,Stan } from "node-nats-streaming";
import { Subjects,Listener,EventUpdatedEvent } from "@iyaa-eventms/common";
import { Event } from "../../models/event";
import { queueGroupName } from "./queue-group-name";

export class EventUpdatedListener extends Listener<EventUpdatedEvent> {
    subject: Subjects.EventUpdated = Subjects.EventUpdated;
    queueGroupName = queueGroupName;

    constructor(client:Stan){
        console.log("listening for event:updated");
        super(client);
    }
    
    async onMessage(data: EventUpdatedEvent['data'], msg: Message) {
        console.log(data);
        const event = await Event.findByEvent({id:data.id,version:data.version})
        if(!event){
            throw new Error('Event not Found');
        }
        
        const {title,price,agentId} = data;
        event.set({title,price,agentId});
        await event.save();

        msg.ack();
        
    }

}