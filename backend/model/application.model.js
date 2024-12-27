import mongoose, { Schema } from "mongoose";

const applicationSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    coverLetter: {
        type: String,
    },
    resume: {
        type:String
    },
    applicant_id:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        }
    },
    recuiter_id:{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        }      
    },
    companyEmail:{
        type:String
    },
    companyName:{
        type:String
    },
    position:{
        type:String
    },
    status:{
        type:String,
        default: 'pending',
        enum:["pending","accept","reject"]
    }
})

export default mongoose.model('application',applicationSchema)