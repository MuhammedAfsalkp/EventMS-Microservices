import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest,validateRole } from '@iyaa-eventms/common';
import { Event } from '../models/events';
import { EventCreatedPublisher } from '../event/publishers/event-created-publisher';
import { natsWrapper } from '../nats-wrapper';
// const fileUpload = require('../middleware/');
import {fileUpload} from '../middleware/file-upload'

const router = express.Router();

interface MulterRequest extends Request{
  file: any;
}

router.post(
  '/api/events',
  requireAuth,validateRole(['agent']),
  fileUpload.single('image'),
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
      body('address').not().isEmpty().withMessage('Title is required'),
      body('description').not().isEmpty().withMessage('description is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price,description,address} = req.body;
    // let image = (req as MulterRequest).file.path;
    console.log(title,price,description,address)


    const event = Event.build({
      title,
      price,
      description,
      address,
      image: (req as MulterRequest).file.path ,
      agentId: req.currentUser!.id,
    });
    await event.save();
    console.log("saved inn DB",event._id)
    await new EventCreatedPublisher(natsWrapper.client).publish({
      id: event._id,
      title: event.title,
      image: event.image,
      price: event.price,
      description: event.description,
      address: event.address,
      agentId: event.agentId,
      version: event.version
    })

    res.status(201).send(event);
  }
);

export { router as createEventRouter };
