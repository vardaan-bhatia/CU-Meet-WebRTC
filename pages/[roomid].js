import { useSocket } from "@/context/socket";
import usePeer from "@/hooks/usePeer";
import { useEffect } from "react";

const Room = () => {
  const socket = useSocket();
  const { peer, peerID } = usePeer();
  useEffect(() => {
    console.log(peerID);
  }, []);
  return (
    <div>
      <h1>this is the peer id of my app:{peerID}</h1>
    </div>
  );
};

export default Room;
