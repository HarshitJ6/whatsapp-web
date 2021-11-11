import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import db from "../../firebase";
import "./SidebarChat.css";

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState();

  useEffect(() => {
    // setSeed(Math.random() * 5000);
    if (id) {
      db.collection("Rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);

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
          <p>{messages && messages[0]?.body}</p>
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
