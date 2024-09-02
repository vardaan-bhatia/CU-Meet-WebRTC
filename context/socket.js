import { createContext, useState, useContext, useEffect } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize socket connection
    const socketConnection = io(); // Defaults to current origin

    setSocket(socketConnection);

    socketConnection.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    return () => {
      socketConnection.disconnect(); // Cleanup on unmount
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
