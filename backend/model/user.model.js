import { timeStamp } from "console";
import mongoose from "mongoose";
import { Schema } from "mongoose";


const userSchema = new Schema({
    firstname: {
        type: String,
        required: [true,'Provide First Name'],
        minLength: [3,"First Name should have atleast 3 chars"],
        trim: true
    },
    lastname:{
        type: String,
        required: [true,'Provide Last Name'],
        minLength: [3,"Last Name should have atleast 3 chars"],
        trim: true
    },
    username:{
        type: String,
        required: [true,"Provide Username"],
        unique: true,
        trim: true
    },
    password:{
        type:String,
        required: [true,"Provide Password"],
    },
    email:{
        type:String,
        required: [true,"Provide Email"],
        unique: true,
        lowercase: true,
        trim: true

    },
    gender:{
        type:String,
        required: [true,"Provide gender"],
        enum: ['male', 'female', 'other']

    },
    niches: {
        type: [String],
        required: true,
        lowercase:true,
        trim:true
      },
    phoneNumber:{
        type:"String",
        required: [true,"Provide PhonNumber"],
        trim: true

    },
    roles:{
        type: String,
        default: 'user',
        enum:['user','recuiter','admin'],
    },
    avatar:{
        type:[{url:"",type:String}],
        default: []
    }
},
{ timestamps: true })

export default mongoose.model("user",userSchema)