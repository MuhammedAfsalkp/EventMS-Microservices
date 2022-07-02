// import {Subjects,EventCreatedEvent,Publisher} from '@iyaa-eventms/common'
import  {Subjects,EventCreatedEvent,Publisher} from '@iyaa-eventms/common'
import { Stan } from 'node-nats-streaming';

export class EventCreatedPublisher extends Publisher<EventCreatedEvent> {

    subject: Subjects.EventCreated = Subjects.EventCreated;
    constructor(client:Stan){
        console.log("event publisher Eventcreated");
        super(client);
    }
    
}
