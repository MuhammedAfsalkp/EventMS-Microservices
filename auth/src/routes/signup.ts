import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { AgentCreatedPublisher } from '../events/publishers/agent-created-publisher';

// import { validateRequest } from '../../../common/src/middlewares/validate-request';
// import { BadRequestError } from '../../../common/src/errors/bad-request-error';
import { validateRequest } from '@iyaa-eventms/common';
import { BadRequestError } from '@iyaa-eventms/common';
import { natsWrapper } from '../nats-wrapper';


const router = express.Router();

router.post( "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],validateRequest,
  async (req: Request, res: Response) => {
     console.log("working")
    const { email,role,userName,password } = req.body;
    const isMax = false;
    const existingUser = await User.findOne({email});
    if(existingUser){
      console.log('Email in use');
      throw new BadRequestError('Email in use');
     
    }

    const user = User.build({email,password,role,userName,isMax});
    await user.save();

    // Generate jwt
    const userJwt = jwt.sign({
      id:user.id,
      email:user.email,
      userName:user.userName,
      role:user.role,
      isMax:user.isMax,
    },'secret');

    // store it on session object
    req.session = {
      jwt: userJwt
    }

    //publish egent created event
    if(user.role == 'agent'){
      await new AgentCreatedPublisher(natsWrapper.client).publish({
        id: user._id,
        userName: user.userName,
        isMax: user.isMax 
      })
    }

   

    res.status(201).send(user);
  }
);

export { router as signupRouter };