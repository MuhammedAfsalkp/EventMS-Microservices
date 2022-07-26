import mongoose from 'mongoose'
import {app} from './app'
import { natsWrapper } from './nats-wrapper';
import { EventCreatedListener } from './events/listeners/event-created-listener';

const start = async () => {
    try{

        await natsWrapper.connect('test-cluster','randomauth123','http://localhost:4222')
        natsWrapper.client.on('close',()=>{
          console.log('NATS CONNECTION CLOSED');
          process.exit()
      });
    
      process.on('SIGINT',()=>natsWrapper.client.close());
      process.on('SIGTERM',()=>natsWrapper.client.close());


     new EventCreatedListener(natsWrapper.client).listen();


        await mongoose.connect('mongodb://127.0.0.1:27017/auth');
        console.log("Connected to DB");
    }catch(err){
        console.log(err);
    }
    app.listen(4000, () => {
        console.log('Auth API Listening on port 4000!!!!!!!!');
      });

};

start();

