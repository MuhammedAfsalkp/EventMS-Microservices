import express, { Request, Response } from 'express';
import { NotFoundError } from '@iyaa-eventms/common';
import { Event } from '../models/events';

const router = express.Router();

router.get('/api/events/:id', async (req: Request, res: Response) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    throw new NotFoundError();
  }

  res.send(event);
});

export { router as showEventRouter };
