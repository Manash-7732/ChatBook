"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controller/auth_controller");
const router = express_1.default.Router();
// Changed login to POST for better practice
router.post("/signup", auth_controller_1.Signup);
router.post("/login", auth_controller_1.Login); // Changed to POST
router.get("/logout", auth_controller_1.Logout);
exports.default = router;
