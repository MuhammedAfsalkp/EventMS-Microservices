import express, { Request, Response } from 'express';
import { NotFoundError,requireAuth,validateRole,AuthorizationError } from '@iyaa-eventms/common';
import { Event } from '../models/events';

const router = express.Router();

router.get('/api/events/agent/:agentId',requireAuth,validateRole(['agent']), async (req: Request, res: Response) => {
    console.log("agent route",req.params.agentId)
  const event = await Event.findOne({agentId:req.params.agentId});

  if (!event) {
    throw new NotFoundError();
  }
   console.log(event)
  res.send(event);
});

export { router as showEventByAgentRouter };