import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  AuthorizationError,
} from '@iyaa-eventms/common';
import { Order } from '../models/order';

const router = express.Router();

router.get(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    console.log("show rote")
    const order = await Order.findById(req.params.orderId).populate('event');

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new AuthorizationError();
    }

    res.send(order);
  }
);

export { router as showOrderRouter };