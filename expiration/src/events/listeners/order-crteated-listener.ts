import { Listener,OrderCreatedEvent, OrderStatus, Subjects } from "@iyaa-eventms/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queuegroupname";

export  class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data:  OrderCreatedEvent['data'], msg: Message){
        
    }

}