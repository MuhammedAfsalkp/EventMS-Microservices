import { Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects } from '@iyaa-eventms/common';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/order';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    console.log("payement - orderCreated")
    const order = Order.build({
      id: data.id,
      price: data.event.price,
      status: data.status,
      userId: data.userId,
      version: data.version,
    });
    await order.save();

    msg.ack();
  }
}
