import { Subjects, Publisher,PayementCreatedEvent } from '@iyaa-eventms/common'

export class PayementCreatedPublisher extends Publisher<PayementCreatedEvent> {
    subject: Subjects.PayementCreated = Subjects.PayementCreated;

}