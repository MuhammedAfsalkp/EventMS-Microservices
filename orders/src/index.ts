import mongoose from 'mongoose';

import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { EventCreatedListener } from './event/listener/event-created-listener';
import { EventUpdatedListener } from './event/listener/event-updated-listener';
import { PaymentCreatedListener } from './event/listener/payment-created-listener';

const start = async () => {
 

  try {
    await natsWrapper.connect('test-cluster','random234','http://localhost:4222')
    natsWrapper.client.on('close',()=>{
      console.log('NATS CONNECTION CLOSED');
      process.exit()
  });

  process.on('SIGINT',()=>natsWrapper.client.close());
  process.on('SIGTERM',()=>natsWrapper.client.close());

  new EventCreatedListener(natsWrapper.client).listen();
  new EventUpdatedListener(natsWrapper.client).listen();
  new PaymentCreatedListener(natsWrapper.client).listen();
  console.log("mongodb connecting")

    await mongoose.connect('mongodb://127.0.0.1:27017/order', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(7000, () => {
    console.log('Order API Listening on port 7000!!!!!!!!');
  });
};

start();

