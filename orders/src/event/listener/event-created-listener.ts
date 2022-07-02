import { Message,Stan } from "node-nats-streaming";
import { Subjects,Listener,EventCreatedEvent } from "@iyaa-eventms/common";
import { Event } from "../../models/event";
import { queueGroupName } from "./queue-group-name";


export class EventCreatedListener extends Listener<EventCreatedEvent> {
    subject: Subjects.EventCreated = Subjects.EventCreated;
    queueGroupName = queueGroupName;
    constructor(client:Stan){
        console.log("listening for event:created");
        super(client);
    }

    async onMessage(data: EventCreatedEvent['data'], msg: Message){
        const { id,title,price,agentId,image } = data;
        console.log(data);
        const event = Event.build({ id,title,price,agentId,image});
        await event.save();

        msg.ack();
   
    }

}