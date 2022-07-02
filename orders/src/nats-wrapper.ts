import nats, {Stan} from 'node-nats-streaming';

class NatsWrapper {
    private _client?: Stan;

    get client() {
        console.log("getting client")
        if(!this._client){
            console.log("error getting client")
            throw new Error('Cannot access NATS client before connecting')
        }

        return this._client;
    }

    connect(clusterId: string, clientId: string, url: string){
        this._client = nats.connect(clusterId,clientId,{url,waitOnFirstConnect:true});
        // const data = JSON.stringify({
        //     id:'123',
        //     title:"47747"
        // })
        // this._client.publish('ticket:created',data,()=>{console.log("Event published")})

        

        return new Promise<void>((resolve,reject)=>{
            this.client.on('connect',()=>{
                console.log("connectd to NATS")
                
                resolve();
            })
            this.client.on('error',(err)=>{
                reject(err);
            })
        })
    }
  

}

export const natsWrapper = new NatsWrapper();