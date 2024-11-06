"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../Route/auth"));
const dotenv_1 = __importDefault(require("dotenv"));
const message_1 = __importDefault(require("../Route/message"));
dotenv_1.default.config();
const port = process.env.Port || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/auth", auth_1.default);
app.use("/message", message_1.default);
app.get("/", function (req, res) {
    res.send("My name is manash raj");
});
app.listen(port);
