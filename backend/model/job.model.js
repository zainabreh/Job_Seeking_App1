import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema({
  position: {
    type:String,
    unique: true
  },
  company: {
    type:String,
    unique: true
  },
  description: String,
  deadline: Date,
  vacancy: Number,
  requiredSkill: [{type:String}],
  facilities: [{type:String}],
  salary: Number,
  email: String,
  jobNewEmail:false,
  location: String,
  status:{
    type:String,
    default:'pending',
    enum:['full-time','part-time','internship'],
  },
  postedBy : {
    type:mongoose.Schema.ObjectId,
    ref:"user",
    required:true
  },
  category: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'category',
    required:true
  }
},
{timestamps:true});
const Job = mongoose.model("job", jobSchema);

export default Job;
