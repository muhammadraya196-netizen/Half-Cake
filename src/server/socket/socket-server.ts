import { Server } from "socket.io";
import type { Server as HttpServer } from "http";

export function createSocketServer(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    path: "/api/socket",
    cors: { origin: "*" }
  });

  io.on("connection", (socket) => {
    socket.emit("transaction", "Register connected to Ray Cake POS realtime bus");
    socket.on("payment:success", (payload) => {
      io.emit("payment", payload);
      io.emit("transaction", "Payment success updated dashboard analytics");
    });
  });

  return io;
}
