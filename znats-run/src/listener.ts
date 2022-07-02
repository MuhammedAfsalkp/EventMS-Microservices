import nats,{Message} from 'node-nats-streaming';

const stan = nats.connect('test-cluster','abcdedf',{url:'http://localhost:4222',waitOnFirstConnect:true});

stan.on('connect',()=>{
    console.log("listener connected ");
    const subscription = stan.subscribe('event:updated');
    subscription.on('message',(msg:Message)=>{
        console.log('message recieved');
        const data = msg.getData();
        if(typeof data === 'string') {
            console.log(`recieved event #${msg.getSequence()} ,with data ${msg.getData()}`)
        }
    })

 
})