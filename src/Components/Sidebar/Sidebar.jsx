import { Avatar, IconButton } from "@material-ui/core";
import { Chat, DonutLarge, MoreVert, SearchOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import db from "../../firebase";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";

function Sidebar() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    db.collection("Rooms").onSnapshot((snapshot) =>
      setRooms(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
    );
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter room name");

    if (roomName) {
      db.collection("Rooms").add({
        name: roomName,
      });
    }
  };

  return (
    <div className="sidebar">
      {/* <button
        onClick={() => {
          console.log(rooms);
        }}
      >
        Button
      </button> */}
      <div className="sidebar-header">
        <Avatar />
        <div className="sidebar-right-icons">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat onClick={() => createChat()} />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="sidebar-search-container">
        <div className="sidebar-search-element">
          <SearchOutlined />
          <input placeholder="Search or Start new chat" type="text" />
        </div>
      </div>
      <div className="sidebar-chats">
        {/* ADD ARCHIVE SECTION */}
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
