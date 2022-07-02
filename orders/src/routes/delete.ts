import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  AuthorizationError,
} from '@iyaa-eventms/common';
import { Order, OrderStatus } from '../models/order';
import { OrderCancelledPublisher } from '../event/publisher/order-cancelled-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.delete(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    console.log("cancelling");
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate('event');
    console.log("deleting",order)


    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new AuthorizationError();
    }
    order.status = OrderStatus.Cancelled;
    await order.save();
    console.log(order)

    // publishing an event saying this was cancelled!
     new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order._id,
      version: order.version,
      event: {
        id: order.event._id
      }
    })
    console.log("del")
    res.send(order);

    // res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };