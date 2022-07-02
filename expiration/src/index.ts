
import { natsWrapper } from './nats-wrapper';


const start = async () => {
 

  try {
    await natsWrapper.connect('test-cluster','random123','http://localhost:4222')
    natsWrapper.client.on('close',()=>{
      console.log('NATS CONNECTION CLOSED');
      process.exit()
  });

  process.on('SIGINT',()=>natsWrapper.client.close());
  process.on('SIGTERM',()=>natsWrapper.client.close());

 
  } catch (err) {
    console.error(err);
  }

 
};

start();

