import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import v1 from './router/version/v1';
import config from '../config'
import * as redis from 'redis'
import * as  uuid from 'uuid'
import session from 'express-session'
import redisStore from 'connect-redis'
import RedisClient from './utils/redis';

const RedisStore = redisStore(session);
dotenv.config();

const app = express();


const redisClient = RedisClient;



//function to set up the connection to the database
const DBInitializatin = ()=>{

    redisClient.connect()
                .then(()=>{
                    console.log("Connected to Redis")
                })
                .catch(err=>{
                    console.log(err)
                })

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

app.use(
    session({
        genid: function(req) {
            return uuid.v4(); // use UUIDs for session IDs
        },
        store: new RedisStore({ client: redisClient }),
        secret: "keyboard cat",
        resave: false,
        name: "session",
        saveUninitialized : false,
        cookie : {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 48,
            sameSite: "none", // sets cookie from apollo studio
            secure: true,
        }
    })
)


app.use("/v1", v1);
app.get("/", (req, res) => res.send("nigerian sd's World!"))
app.listen(3001, () => console.log('Server is running on port 3001'));
