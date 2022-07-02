import express, { Request, Response } from 'express';
import { Event } from '../models/events';
import {requireAuth} from '@iyaa-eventms/common'

const router = express.Router();

router.get('/api/events', requireAuth,async (req: Request, res: Response) => {
 console.log("index route")
  const events = await Event.find({});

  res.send(events);
});

export { router as indexEventRouter };
