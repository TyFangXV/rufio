import express from 'express';
import dotenv from 'dotenv';
import authRouter from './middleware/auth'
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
dotenv.config();


mongoose.connect(process.env.DB_CONNECTION as string, () => console.log('connected to mongo'));

app.use(cors())
app.use("/auth", authRouter)

app.get("/", (req, res) => res.send("Hello World!"))

app.listen(3001, () => console.log('Server is running on port 3001'));
