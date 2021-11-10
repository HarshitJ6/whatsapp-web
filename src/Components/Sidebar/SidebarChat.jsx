import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import db from "../../firebase";
import "./SidebarChat.css";

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.random() * 5000);
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter room name");
    if (roomName) {
      db.collection("Rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebar-chat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebar-chat-info">
          <h4>{name}</h4>
          <p>Recent Message...</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebar-chat">
      <h4>Add New Chat</h4>
    </div>
  );
}

export default SidebarChat;
