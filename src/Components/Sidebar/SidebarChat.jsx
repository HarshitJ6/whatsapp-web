import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./SidebarChat.css";

function SidebarChat({ addNewChat }) {
  const [seed, setSeed] = useState("");
  useEffect(() => {
    setSeed(Math.random() * 5000);
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter room name");
  };

  return !addNewChat ? (
    <div className="sidebar-chat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebar-chat-info">
        <h4>Room Name</h4>
        <p>Recent Message...</p>
      </div>
    </div>
  ) : (
    <div onClick={createChat} className="sidebar-chat">
      <h4>Add New Chat</h4>
    </div>
  );
}

export default SidebarChat;
