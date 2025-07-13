import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors({
  origin: [ process.env.CLIENT_URL, 'http://localhost:3000'],
  credentials: true
}));
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("✅ New user:", socket.id);
  socket.on("emotion", (data) => {
    console.log("Received emotion:", data);
    // broadcast updated story part to everyone
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
