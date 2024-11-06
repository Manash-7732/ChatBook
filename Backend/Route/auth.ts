import express from "express";
import { Give, Login, Logout, Signup } from '../controller/auth_controller';

const router = express.Router();

// Changed login to POST for better practice
router.post("/signup", Signup);
router.post("/login", Login); // Changed to POST

router.post("/logout", Logout);
router.get("/getit",Give)

export default router;
