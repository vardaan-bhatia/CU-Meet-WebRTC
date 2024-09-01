// pages/index.js

import { useSocket } from "@/context/socket";
import { useEffect } from "react";

export default function Home() {
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      const handleConnect = () => {
        console.log("Socket connected with ID:", socket.id);
      };

      const handleDisconnect = () => {
        console.log("Socket disconnected");
      };

      socket.on("connect", handleConnect);
      socket.on("disconnect", handleDisconnect);

      return () => {
        socket.off("connect", handleConnect);
        socket.off("disconnect", handleDisconnect);
      };
    }
  }, [socket]);

  return <h1>Socket.IO with Next.js</h1>;
}
