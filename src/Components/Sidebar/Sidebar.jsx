import { Avatar, Button, IconButton } from "@material-ui/core";
import { Chat, DonutLarge, MoreVert, SearchOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import db from "../../firebase";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";
import ProfileUpload from "../ProfileUpload";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";

const fileTypes = ".png,.jpeg,.jpg";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [xyz, dispatch] = useStateValue();

  useEffect(() => {
    console.log(xyz);
    db.collection("profile").onSnapshot((snap) => {
      console.log(snap.docs[0].id);
      dispatch({
        type: actionTypes.SET_ID,
        dbId: snap.docs[0].id,
      });
    });
    db.collection("profile").onSnapshot((snapshot) =>
      // setRooms(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      console.log(snapshot)
    );
  }, []);

  useEffect(() => {
    if (xyz.dbId) {
      db.collection("profile")
        .doc(xyz.dbId)
        .collection("rooms")
        .onSnapshot((snapshot) => {
          setRooms(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          );
        });
    }
  }, [xyz.dbId]);
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
      {/* <img src={user?.photoURL} /> */}
      {/* <button
        onClick={() => {
          console.log(xyz);
        }}
      >
        Button
      </button> */}
      <div className="sidebar-header">
        <ProfileUpload extensions={fileTypes}>
          <Avatar src={xyz.user?.photoURL} className="sidebar-profile-avatar" />
        </ProfileUpload>

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
