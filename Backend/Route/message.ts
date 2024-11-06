import express from "express"

const router = express.Router();

router.get("/conversations",function(req,res){
     res.send("Lets start conversation");
})

export default router