import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authHandler from './router/auth';

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGODB_URI as string, () => console.log('connected to mongo'));


app.use(cors())
app.use("/auth", authHandler);
app.get("/", (req, res) => res.send("Hello World!"))

app.listen(3001, () => console.log('Server is running on port 3001'));
