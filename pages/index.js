import { useSocket } from "@/context/socket";
import { useEffect, useState } from "react";

export default function Home() {
  const socket = useSocket();
  const [socketID, setSocketID] = useState(null);
  const [isServerInitialized, setIsServerInitialized] = useState(false); // Flag to check server initialization

  useEffect(() => {
    // Initialize the Socket.IO server once
    const initializeSocketServer = async () => {
      if (!isServerInitialized) {
        await fetch("/api/socket");
        setIsServerInitialized(true); // Set the flag to true after initializing
      }
    };

    initializeSocketServer();

    if (socket) {
      const handleConnect = () => {
        console.log("Socket connected with ID:", socket.id);
        setSocketID(socket.id);
      };

      const handleDisconnect = () => {
        console.log("Socket disconnected");
        setSocketID(null); // Clear socket ID on disconnect
      };

      socket.on("connect", handleConnect);
      socket.on("disconnect", handleDisconnect);

      return () => {
        socket.off("connect", handleConnect);
        socket.off("disconnect", handleDisconnect);
      };
    }
  }, [socket, isServerInitialized]);

  return (
    <div>
      <h1>Socket.IO with Next.js</h1>
      {socketID ? (
        <p>Socket ID: {socketID}</p>
      ) : (
        <p>Connecting to Socket...</p> // Provide feedback if not connected
      )}
    </div>
  );
}
