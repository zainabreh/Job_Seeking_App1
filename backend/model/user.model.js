import mongoose from "mongoose";
import { Schema } from "mongoose";


const userSchema = new Schema({
    firstname: {
        type: String,
        required: [true,'Provide First Name'],
        minLength: [3,"First Name should have atleast 3 chars"],
    },
    lastname:{
        type: String,
        required: [true,'Provide First Name'],
        minLength: [3,"Last Name should have atleast 3 chars"],
    },
    username:{
        type: String,
        required: [true,"Provide Username"],
        unique: true
    },
    password:{
        type:String,
        required: [true,"Provide Password"],
    },
    email:{
        type:String,
        required: [true,"Provide Email"],

    },
    gender:{
        type:String,
        required: [true,"Provide gender"],

    },
    phoneNumber:{
        type:"String",
        required: [true,"Provide PhonNumber"],

    },
    roles:{
        type: String,
        default: 'user',
        enum:['user','recuiter','admin'],
    },
    avatar:{
        type:[{url:"",type:String}]
    }
})

export default mongoose.model("user",userSchema)