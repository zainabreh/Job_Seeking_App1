import mongoose from 'mongoose';
import 'dotenv/config'

export const connectDB = async () => {  

    try {
        // mongoose.set('debug', true);
        mongoose.set('strictQuery', false);
        const res = await mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0.rep2s.mongodb.net/job-finding-app?retryWrites=true&w=majority&ssl=true`,  {
            tls: true,
            tlsInsecure: true ,
            // autoSelectFamily:false,
            serverSelectionTimeoutMS: 5000,
            family: 4
          });
        console.log('Database connected', res.connection.port)
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

