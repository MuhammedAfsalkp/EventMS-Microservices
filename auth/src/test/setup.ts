import {MongoMemoryServer} from 'mongodb-memory-server'
import mongoose from "mongoose";
import { app } from "../app";


let mongo: any ;
beforeAll(async ()=>{
     mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri)
})

beforeEach(async ()=>{
    const collecctions = await mongoose.connection.db.collections();
    for(let collecction of collecctions){
        await collecction.deleteMany({});
    }
})

afterAll(async ()=>{
    await mongo.stop();
    await mongoose.connection.close();
})
