import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  KeyboardVoice,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import db from "../../firebase";
import "./Chat.css";

function Chat() {
  const [seed, setSeed] = useState("");
  const [typeMessage, setTypeMessage] = useState();
  const [roomName, setRoomName] = useState("h");
  const { roomId } = useParams();

  useEffect(() => {
    // console.log(id);
    if (roomId) {
      db.collection("Rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          console.log("hello", snapshot);
          setRoomName(snapshot.data().name);
        });
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.random() * 5000);
  }, []);

  function sendMessage(e) {
    e.preventDefault();
    // alert(typeMessage);
    setTypeMessage(" ");
  }

  return (
    <div className="chat">
      {/* <button
        onClick={() => {
          console.log(roomId);
          console.log(roomName);
        }}
      >
        Log Room Name
      </button> */}
      <div className="chat-header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat-header-info">
          <h3>{roomName}</h3>
          <p>Last seen at 2:00 p.m.</p>
        </div>
        <div className="chat-header-right">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat-body">
        <p className={`chat-message-reciever ${true && "chat-message-sender"}`}>
          <span className="chat-message-name">Hritik Jain</span>
          Welcome to Whatsapp Web!
          <span className="chat-message-time">12:06 pm</span>
        </p>
      </div>
      <div className="chat-footer">
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <IconButton>
          <AttachFile />
        </IconButton>
        <form>
          <input
            type="text"
            placeholder="type a message ... "
            value={typeMessage}
            onChange={(e) => {
              setTypeMessage(e.target.value);
            }}
          />
          <button type="submit" onClick={sendMessage}>
            {" "}
            Send a message{" "}
          </button>
        </form>
        <IconButton>
          <KeyboardVoice />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
