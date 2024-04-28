const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const server = express();
const connection = require("./config/connection");
const userRouter = require("./routes/userRouter");
const noteRouter = require("./routes/noteRouter")

server.use(cors());
server.use(express.json());
server.use("/user", userRouter);
server.use("/note", noteRouter);



server.get("/", (req, res) => {
    res.send("hello world");
})


server.listen(process.env.PORT, async () => {
    try {
        await connection;
        console.log(`server is running on ${process.env.PORT} and db connected`)
    } catch (error) {
        console.log(error)
    }
})

