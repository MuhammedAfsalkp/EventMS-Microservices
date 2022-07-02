import mongoose from 'mongoose'
import {app} from './app'

const start = async () => {
    try{
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

