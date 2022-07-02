import { Publisher,OrderCreatedEvent,Subjects } from "@iyaa-eventms/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}