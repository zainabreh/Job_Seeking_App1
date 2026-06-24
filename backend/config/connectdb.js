import mongoose from 'mongoose';
import 'dotenv/config'
import category from '../model/category.model.js';
import Job from '../model/job.model.js';

export const connectDB = async () => {  

    try {
        mongoose.set('debug', true);
        mongoose.set('strictQuery', false);
        
        const res = await mongoose.connect(`${process.env.MONGOURL}`,  {
            tls: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            family: 4
        });
        console.log('Database connected', res.connection.port)
        // await category.collection.dropIndexes();
        // await Job.collection.dropIndexes();
    } catch (error) {
        console.log("Connection error", error);
    }
}


// export const connectDB = async () => {  

//     try {
//         mongoose.set('debug', true);
//         const res = await mongoose.connect('mongodb://127.0.0.1/job-finding-app');
//         console.log('Database connected', res.connection.port)
//     } catch (error) {
//         console.log("Connection error", error);
//     }
// }

