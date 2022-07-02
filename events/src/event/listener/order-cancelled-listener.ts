import { Listener,OrderCancelled,Subjects } from "@iyaa-eventms/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Event } from "../../models/events";
import { EventUpdatedPublisher } from "../publishers/event-updated-publisher";

export class OrderCancelledListener extends Listener <OrderCancelled>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCancelled['data'], msg: Message) {
        const event = await Event.findById(data.event.id);

        if(!event){
            throw new Error('Event not found');
        }

        event.set({orderId:undefined})
        await event.save();
        await new EventUpdatedPublisher(this.client).publish({
            id: event._id,
            orderId: event.orderId,
            agentId: event.agentId,
            price: event.price,
            image: event.image,
            description: event.description,
            title: event.title,
            address: event.address,
            version: event.version

        })


        
    }

}