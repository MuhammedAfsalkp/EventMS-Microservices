import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  OrderStatus,
  BadRequestError,
  validateRole
} from '@iyaa-eventms/common';
import { body } from 'express-validator';
import { Event } from '../models/event';
import { Order } from '../models/order';
import { OrderCreatedPublisher } from '../event/publisher/order-created-publisher';
import { natsWrapper } from '../nats-wrapper';


const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

router.post(
  '/api/orders',
  requireAuth,validateRole(['user']),
  [
    body('eventId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('EventId must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { eventId } = req.body;
    console.log(eventId);

    // Find the eventGroup the user is trying to order in the database
    const event = await Event.findById(eventId);
    if (!event) {
      throw new NotFoundError();
    }
    console.log(event)

    // Make sure that this eventGroup is not already reserved
    // const isReserved = await Event.isReserved();
    // console.log(isReserved);
    // if (isReserved) {
    //   throw new BadRequestError('Ticket is already reserved');
    // }
    const existingOrder = await Order.findOne({
      event: this as any,
      status: {
        $in: [
          OrderStatus.Created,
          OrderStatus.AwaitingPayment,
          OrderStatus.Complete,
        ],
      },
    });
    console.log("existinOrder",existingOrder)
    if(existingOrder){
      throw new BadRequestError('Event is already reserved');
    }

    // Calculate an expiration date for this order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    // Build the order and save it to the database
    const order = Order.build({
      userId: req.currentUser!.id,
      userName:req.currentUser!.userName,
      status: OrderStatus.Created,
      expiresAt: expiration,
      agentId:event.agentId,
      event,
    });
    await order.save();

    // Publish an event saying that an order was created
    new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order._id,
      version: order.version,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      event: {
        id: event._id,
        title: event.title,
        price: event.price,
        agentId: event.agentId
      }
    })

    res.status(201).send(order);
  }
);

export { router as newOrderRouter };