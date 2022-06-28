import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import apiRoutes from './router/controller';
import config from '../config'


dotenv.config();

const app = express();




//function to set up the connection to the database
const DBInitializatin = ()=>{  
    mongoose.connect( config.db as string)
            .then(()  => console.log('Connected to MongoDB'))
            .catch(err => {
                setTimeout(DBInitializatin, 5000);
                throw err;
            });
}
DBInitializatin()




app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}))




app.use("/api", apiRoutes);
app.get("/", (req, res) => res.send("nigerian sd's World!"))
app.listen(3001, () => console.log('Server is running on port 3001'));
