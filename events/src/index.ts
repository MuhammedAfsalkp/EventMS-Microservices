import mongoose from 'mongoose';

import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { OrderCreatedListener } from './event/listener/order-created-listener';
import { OrderCancelledListener } from './event/listener/order-cancelled-listener';

const start = async () => {
 

  try {
    await natsWrapper.connect('test-cluster','random123','http://localhost:4222')
    natsWrapper.client.on('close',()=>{
      console.log('NATS CONNECTION CLOSED');
      process.exit()
  });

  process.on('SIGINT',()=>natsWrapper.client.close());
  process.on('SIGTERM',()=>natsWrapper.client.close());

  // new OrderCreatedListener(natsWrapper.client).listen();
  // new OrderCancelledListener(natsWrapper.client).listen();

    await mongoose.connect('mongodb://127.0.0.1:27017/event', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(8000, () => {
    console.log('Event API Listening on port 8000!!!!!!!!');
  });
};

start();

