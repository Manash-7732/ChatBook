import express from "express"
import protectRoute from "../middlewares/genToken";
import {getMessages, getUserForSideBar, sendMessage} from "../controller/messageController"

const router = express.Router();

router.get("/conversations",protectRoute,getUserForSideBar);
router.post("/send/:id",protectRoute,sendMessage);
router.get("/:id",protectRoute,getMessages);



export default router