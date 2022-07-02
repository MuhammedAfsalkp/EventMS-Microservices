import mongoose from "mongoose";
import {Password} from '../services/password'

// an interface that describe the properties
// that is required to create new User
interface UserAttrs {
    userName: string;
    email: string;
    password: string;
    role: string;
}

//An interface that cdescribes the properties
//that a usder Model has
interface userModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;

}

//An interface that cdescribes the properties
//that a usder document has
interface UserDoc extends mongoose.Document{
    email: string;
    password: string;
    userName: string;
    role: string;

}


const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true

    },
    email:{
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true

    },
    role:{
        type: String,
        required: true,
        default:'user',
        enum:['user','agent']

    }
},{
    toJSON:{
        transform(doc,ret){
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;

        }

    }
});

userSchema.pre('save',async function(done){
    if(this.isModified('password')){
        const hashed =await Password.toHah(this.get('password'));
        this.set('password',hashed);
    }
    done();
})

userSchema.statics.build = (attrs:UserAttrs) =>{
    return new User(attrs);
}

const User = mongoose.model<UserDoc, userModel>('User',userSchema);




export { User };