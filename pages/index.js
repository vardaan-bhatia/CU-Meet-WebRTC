import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");

  const createAndJoin = () => {
    const roomId = uuidv4();
    router.push(`/${roomId}`);
  };

  const joinRoom = () => {
    if (roomId) router.push(`/${roomId}`);
    else {
      alert("Please provide a valid room id");
    }
  };
  return (
    <div>
      <h1>Google Meet Clone</h1>
      <div>
        <input
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e?.target?.value)}
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>
      <span>--------------- OR ---------------</span>
      <button onClick={createAndJoin}>Create a new room</button>
    </div>
  );
}
