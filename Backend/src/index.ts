import express from "express"
import auth from "../Route/auth"
import dotenv from "dotenv"
import message from "../Route/message"


dotenv.config();
const port = process.env.Port || 3000
const app=express();
app.use(express.json());

app.use("/auth",auth)
app.use("/message" , message)

app.get("/",function(req,res){
    res.send("My name is manash raj");
})

app.listen(port);