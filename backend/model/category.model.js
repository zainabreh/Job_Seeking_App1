import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    categoryName: {
        type: String,
        unique: true,
        required:true
    },
    jobs: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'job'
        }
    ]
})

export default mongoose.model('category',categorySchema)