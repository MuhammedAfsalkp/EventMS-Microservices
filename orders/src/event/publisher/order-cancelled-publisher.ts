import { Publisher,OrderCancelled,Subjects } from "@iyaa-eventms/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelled> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}