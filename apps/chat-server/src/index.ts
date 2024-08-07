import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import prisma from "@repo/db/client";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

const io = new Server(server, {
  cors: {
    origin: CORS_ORIGIN,
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: CORS_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
  })
);

io.on("connection", (socket: Socket) => {
  console.log("A user connected");

  socket.on("join", async (conversationId: number) => {
    console.log("User joined conversation", conversationId);
    socket.join(conversationId.toString());
    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
    });
    socket.emit("load_messages", messages);
  });

  socket.on("leave", (conversationId: number) => {
    console.log("User left conversation", conversationId);
    socket.leave(conversationId.toString());
  });

  socket.on("message", async ({ conversationId, senderId, text }) => {
    console.log(
      `Message received from user ${senderId} in conversation ${conversationId}: ${text}`
    );

    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { user1: true, user2: true },
    });

    if (!conversation) {
      console.log(`Conversation ${conversationId} not found`);
      return;
    }

    const receiverId =
      conversation.user1Id === senderId
        ? conversation.user2Id
        : conversation.user1Id;

    const message = await prisma.message.create({
      data: {
        conversationId,
        senderId,
        receiverId,
        text,
      },
    });

    io.to(conversationId.toString()).emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
