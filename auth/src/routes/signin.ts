import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { Password } from '../services/password';
import { User } from '../models/user';
// import { validateRequest } from '../../../common/src/middlewares/validate-request';
// import { BadRequestError } from '../../../common/src/errors/bad-request-error';
// import { AuthorizationError } from '../../../common/src/errors/authorization-error';


import { validateRequest } from '@iyaa-eventms/common';
import { BadRequestError } from '@iyaa-eventms/common';
import { AuthorizationError } from '@iyaa-eventms/common';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password,role } = req.body;
    console.log(email,password,role)

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }
    if(existingUser.role != role){
      throw new AuthorizationError();

    }


    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
  
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid Credentials');
    }
    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        userName:existingUser.userName,
        role:existingUser.role
      },
      'secret'
    );
   

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };