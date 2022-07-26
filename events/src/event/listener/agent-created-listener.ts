import { Message,Stan } from "node-nats-streaming";
import { Subjects,Listener,AgentCreatedEvent } from "@iyaa-eventms/common";
import { Agent } from "../../models/agents";
import { queueGroupName } from "./queue-group-name";


export class AgentCreatedListener extends Listener<AgentCreatedEvent> {
    subject: Subjects.AgentCreated = Subjects.AgentCreated;
    queueGroupName = queueGroupName;
    constructor(client:Stan){
        console.log("listening for agent:created");
        super(client);
    }

    async onMessage(data: AgentCreatedEvent['data'], msg: Message){
        const { id,userName,isMax } = data;
        console.log(data);
        const agent = Agent.build({ id,userName,isMax});
        await agent.save();

        msg.ack();
   
    }

}