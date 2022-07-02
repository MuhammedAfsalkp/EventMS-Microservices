import mongoose from 'mongoose';

import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { OrderCancelledListener } from './events/listeners/order-cancelled-listener';
import { OrderCreatedListener } from './events/listeners/order-created-listener';


const start = async () => {
 console.log("working");

  try {
    await natsWrapper.connect('test-cluster','payement','http://localhost:4222')
    natsWrapper.client.on('close',()=>{
      console.log('NATS CONNECTION CLOSED');
      process.exit()
  });

  process.on('SIGINT',()=>natsWrapper.client.close());
  process.on('SIGTERM',()=>natsWrapper.client.close());

  new OrderCreatedListener(natsWrapper.client).listen();
  new OrderCancelledListener(natsWrapper.client).listen();
  console.log("mongodb connecting")

 

    await mongoose.connect('mongodb://127.0.0.1:27017/payement', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(9000, () => {
    console.log('Payement API Listening on port 9000!!!!!!!!');
  });
};

start();

