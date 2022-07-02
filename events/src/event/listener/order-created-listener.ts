import { Listener,OrderCreatedEvent,OrderStatus,Subjects } from "@iyaa-eventms/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queue-group-name";
import { Event } from "../../models/events";
import { EventUpdatedPublisher } from "../publishers/event-updated-publisher";


export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        // Find the Event the order is reserving
        const event = await Event.findById(data.event.id);

        // if no event. throw error
        if(!event) {
            throw new Error('Event not found')
        }

        // Mark the order as being reserved by setting its orderId property
        event.set({orderId: data.id});

        //Save the event
        await event.save();

         // Here(above) we are updating Event db,so it is necessary to update
        //  verion number in order db to function nats server correctly
        await new EventUpdatedPublisher(this.client).publish({
            id: event._id,
            price: event.price,
            title: event.title,
            image: event.image,
            description: event.description,
            agentId: event.agentId,
            address: event.address,
            version:event.version,
            orderId:event.orderId 

        })

        // ack the message
        msg.ack();

        
    }

}