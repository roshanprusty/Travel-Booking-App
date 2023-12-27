import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import tourRoute from './routes/tours.js';
dotenv.config()
const app = express();
const port = process.env.PORT || 8000;

//db connection
mongoose.set('strictQuery', false);
const connect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology: true
        })
        console.log('MongoDB database connected');
    }catch(err){
        console.log('MongoDB connection failed');
    }
}

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/tours', tourRoute);

app.listen(port, ()=>{
    connect();
    console.log('listening on port', port);
});