import express,{ Request, Response ,NextFunction } from 'express';
import 'express-async-errors';
import { json} from 'body-parser';
const bodyParser =require('body-parser')
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@iyaa-eventms/common';
import { OrderCancelledListener } from './events/listeners/order-cancelled-listener';
import { OrderCreatedListener } from './events/listeners/order-created-listener';
import { createChargeRouter } from './routes/new';



const app = express();

// app.set('trust proxy', true);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000 ');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});
app.use(json());


app.use(
  cookieSession({
    signed: false,
    // secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUser);
app.use(createChargeRouter);



// app.use((error:Error, req:Request, res:Response, next:NextFunction) => {
//   if (req.file) {
//     fs.unlink(req.file.path, err => {
//       console.log(err);
//     });
//   }
//   if (res.headerSent) {
//     return next(error);
//   }
//   res.status(error.code || 500);
//   res.json({ message: error.message || 'An unknown error occurred!' });
// });

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
