import  {Subjects,AgentCreatedEvent,Publisher} from '@iyaa-eventms/common'
import { Stan } from 'node-nats-streaming';

export class AgentCreatedPublisher extends Publisher<AgentCreatedEvent> {

    subject: Subjects.AgentCreated = Subjects.AgentCreated;
    constructor(client:Stan){
        console.log("event publisher Agentcreated");
        super(client);
    }
    
}
