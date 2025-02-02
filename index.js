const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require("./db");
const http = require("http")
const cors = require("cors")
const { Server } = require("socket.io")
const { requireAuth, ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');

dotenv.config({ path: "./env" });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: "*"
}))
app.use(express.urlencoded())

const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:"https://thunderous-bombolone-3f2d11.netlify.app"
    }
})

io.on('connection', (socket) => {
    console.log(`New client connected ${socket.id}`);

    socket.on("send_message", (data)=> {
        socket.broadcast.emit("receive_message",data)
    })
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
    
    
});

connectDB()
    .then(() => {
        server.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
        console.log("connection successfull")
        server.on("error", (error) => {
            console.log("error : ", error);
            throw error;
        })
    })
    .catch((err) => { console.log("Database not Connected !!!!", err) })


const userrouter = require("./router/user.router.js")
const taskrouter = require("./router/task.router.js")

app.get("/",(req,res)=>{res.send("Hello server is running")})
app.use("/user", userrouter)
app.use("/task", taskrouter)

app.use("/protected-endpoint", ClerkExpressWithAuth({
    apiKey: process.env.CLERK_API_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
}), (req, res) => {
    res.json(req.auth);
});

app.get('/profile', requireAuth(), (req, res) => {
    res.json(req.session.user);
});
