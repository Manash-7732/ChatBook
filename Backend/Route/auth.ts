import express from "express";
import { Getme, Give, Login, Logout, Signup } from '../controller/auth_controller';
import protectRoute from "../middlewares/genToken"

const router = express.Router();


router.get("/me",protectRoute, Getme);
router.post("/signup", Signup);
router.post("/login", Login); // Changed to POST

router.post("/logout", Logout);
router.get("/getit",Give)

export default router;
