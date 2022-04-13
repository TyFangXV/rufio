import express, { Application } from 'express'
import http from 'http'
import {Server} from 'socket.io'
import cors from 'cors'

import authRouter from './middleware/auth/index'
const expressApp:Application = express();

const server = http.createServer(expressApp);

const io = new Server(server, {
    cors : {
        origin: '*',
        methods : ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders : ['Content-Type', 'Authorization', 'Accept'],
    }
});

expressApp.use(cors())
expressApp.use("/auth", authRouter)

expressApp.get("/", (req, res) => {
    res.send("Hello World")
})


io.on("connection", (socket) => {
    socket.emit("me", socket.id);
    
    socket.on("disconnect", () => {
        socket.broadcast.emit("user disconnected");
    })


    socket.on("call", ({userToCall, signalData, from, name}) => {
        io.to(userToCall).emit("call", {signal : signalData, from, name});
    })

    socket.on("answer", (data) => {
        io.to(data.to).emit("call answer", data.signal);
    })
})

server.listen(3000, () => {
    console.log("Server is running on port 3000")
})