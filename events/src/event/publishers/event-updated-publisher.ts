import  {Subjects,EventUpdatedEvent,Publisher} from '@iyaa-eventms/common'
import { Stan } from 'node-nats-streaming';

export class EventUpdatedPublisher extends Publisher<EventUpdatedEvent> {

    subject: Subjects.EventUpdated = Subjects.EventUpdated;
    constructor(client:Stan){
        console.log("event publisher EventUpdated");
        super(client);
    }
    
}