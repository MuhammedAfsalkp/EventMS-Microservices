import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  AuthorizationError,
  NotFoundError,
  OrderStatus,
} from '@iyaa-eventms/common';
import { stripe } from '../stripe';
import { Order } from '../models/order';
import { Payment } from '../models/payment';
import { PayementCreatedPublisher } from '../events/publishers/payment-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post(
  '/api/payments',
  requireAuth,
  [body('token').not().isEmpty(), body('orderId').not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    console.log("route post payement working")
    const { token, orderId } = req.body;
    console.log(orderId)

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new AuthorizationError();
    }
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError('Cannot pay for an cancelled order');
    }
    console.log("sett")

    // await stripe.charges.create({
    //   currency: 'usd',
    //   amount: order.price * 100,
    //   source: token,
    // })

    const payementIntent = await stripe.paymentIntents.create({
      amount: 1099,
      currency:'usd',
      payment_method_types:['card'],
    })
    console.log(payementIntent)

    const payment = Payment.build({
      orderId,
      stripeId: payementIntent.id,
    });
    await payment.save();
    new PayementCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      stripeId: payment.stripeId
    })

    res.status(201).send({ success: true,id: payment.id });
  }
);

export { router as createChargeRouter };
