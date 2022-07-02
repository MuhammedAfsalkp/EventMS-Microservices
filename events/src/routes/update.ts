import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  validateRequest,
  NotFoundError,
  requireAuth,
  AuthorizationError,
  validateRole,
  BadRequestError
} from '@iyaa-eventms/common';
import { Event } from '../models/events';
import { EventUpdatedPublisher } from '../event/publishers/event-updated-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.put(
  '/api/events/:id',
  requireAuth,validateRole(['agent']),
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be provided and must be greater than 0'),
      body('address').not().isEmpty().withMessage('Title is required'),
      body('description').not().isEmpty().withMessage('description is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const event = await Event.findById(req.params.id);

    if (!event) {
      throw new NotFoundError();
    }

    if (event.agentId!== req.currentUser!.id) {
      throw new AuthorizationError();
    }

    if(event.orderId){
      throw new BadRequestError('Cannot update Reserved Event')
      
    }

    event.set({
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      address: req.body.address
    });
    await event.save();
    new EventUpdatedPublisher(natsWrapper.client).publish({
      id: event._id,
      title: event.title,
      price: event.price,
      image: event.image,
      description: event.description,
      address: event.address,
      agentId: event.agentId,
      version: event.version,
      orderId: event.orderId
    })

    res.send(event);
  }
);

export { router as updateEventRouter };
