"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.Signup = exports.Login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../db/prisma"));
const generateToke_1 = __importDefault(require("../Utils/generateToke"));
const Login = async (req, res) => {
    res.send("Login Successfully");
};
exports.Login = Login;
const Signup = async (req, res) => {
    try {
        const { fullname, username, password, confirmPassword, gender } = req.body;
        if (!fullname || !username || !password || !confirmPassword || !gender) {
            res.status(400).json({ message: "Please fill the form properly" });
            return;
        }
        if (password !== confirmPassword) {
            res.status(400).json({ message: "Passwords don't match" });
            return;
        }
        const user = await prisma_1.default.user.findUnique({ where: { username } });
        if (user) {
            res.status(400).json({ message: "Username already exists" });
            return;
        }
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = await prisma_1.default.user.create({
            data: {
                fullname,
                username,
                password: hashedPassword,
                gender,
                profilePic: gender === "male" ? boyProfilePic : girlProfilePic
            }
        });
        if (newUser) {
            (0, generateToke_1.default)(newUser.id, res);
            res.status(201).json({
                id: newUser.id,
                fullname: newUser.fullname,
                username: newUser.username,
                profilePic: newUser.profilePic
            });
        }
        else {
            res.status(400).json({ message: "Invalid user data" });
            return;
        }
    }
    catch (error) {
        console.error("Error in signup controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.Signup = Signup;
const Logout = async (req, res) => {
    res.send("Logout Successfully");
};
exports.Logout = Logout;
