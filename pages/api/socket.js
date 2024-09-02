import { Server } from "socket.io";

const handler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket server already running");
    res.end();
    return;
  }

  console.log("Initializing Socket.IO server...");
  const io = new Server(res.socket.server);

  io.on("connection", (socket) => {
    console.log("Client connected with ID:", socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  res.socket.server.io = io;
  res.end();
};

export default handler;
