import { useState, useEffect } from "react";
import Peer from "peerjs";

const usePeer = () => {
  const [peer, setPeer] = useState(null);
  const [peerID, setPeerID] = useState("");
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    // Initialize Peer instance
    const newPeer = new Peer(); // You can pass an ID or options if needed
    setPeer(newPeer);

    // Handle the 'open' event to get the peer ID
    newPeer.on("open", (id) => {
      setPeerID(id);
    });

    // Handle new connections
    newPeer.on("connection", (conn) => {
      setConnections((prev) => [...prev, conn]);

      conn.on("data", (data) => {
        console.log("Received data from peer:", data);
      });
    });

    // Handle disconnection
    newPeer.on("disconnected", () => {
      console.log("Peer disconnected");
    });

    // Handle errors
    newPeer.on("error", (err) => {
      console.error("PeerJS error:", err);
    });

    // Cleanup on component unmount
    return () => {
      newPeer.destroy();
      setPeer(null);
      setPeerID("");
      setConnections([]);
    };
  }, []);

  return { peer, peerID, connections };
};

export default usePeer;
