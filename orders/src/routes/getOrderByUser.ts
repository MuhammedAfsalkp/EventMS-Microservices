import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  AuthorizationError,
  validateRole
} from '@iyaa-eventms/common';
import { Order } from '../models/order';

const router = express.Router();

router.get(
  '/api/orders/user/:userId',
  requireAuth,validateRole(['user']),
  async (req: Request, res: Response) => {
      console.log("working yes",req.params.userId)
    const order = await Order.find({userId:req.params.userId}).populate('event');
     console.log("order",order)
    if (!order) {
      throw new NotFoundError();
    }
    // if (order.userId !== req.currentUser!.id) {
    //   throw new AuthorizationError();
    // }

    res.send(order);
  }
);

export { router as getOrderByUser };