"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const allowedOrigin = process.env.CLIENT_URL || '';
app.use((0, cors_1.default)({
    origin: allowedOrigin,
    credentials: true
}));
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, { cors: { origin: "*" } });
io.on("connection", (socket) => {
    console.log("✅ New user:", socket.id);
    socket.on("emotion", (data) => {
        console.log("Received emotion:", data);
        // broadcast updated story part to everyone
    });
});
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
