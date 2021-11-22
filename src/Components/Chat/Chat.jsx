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
import { useStateValue } from "../../StateProvider";
import "./Chat.css";
import firebase from "firebase";
import ProfileUpload from "../ProfileUpload";

const fileTypes = ".pdf";

function Chat() {
  const [seed, setSeed] = useState("");
  const [typeMessage, setTypeMessage] = useState();
  const [roomName, setRoomName] = useState("h");
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();
  const [{ user, dbId }, dispatch] = useStateValue();

  useEffect(() => {
    // console.log(id);
    if (roomId) {
      db.collection("profile")
        .doc(dbId)
        .collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          // console.log("hello", snapshot);
          setRoomName(snapshot.data().name);

          db.collection("profile")
            .doc(dbId)
            .collection("rooms")
            .doc(roomId)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot) => {
              // console.log(snapshot);
              setMessages(snapshot.docs.map((doc) => doc.data()));
            });
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
    db.collection("profile")
      .doc(dbId)
      .collection("rooms")
      .doc(roomId)
      .collection("messages")
      .add({
        name: user.displayName,
        message: typeMessage,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
  }

  return (
    <div className="chat">
      <button
        onClick={() => {
          console.log(messages);
        }}
      >
        Log Room Name
      </button>
      <div className="chat-header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat-header-info">
          <h3>{roomName}</h3>
          <p>
            Last Activity{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
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
        {messages.map((message) => (
          <p
            className={`chat-message-reciever ${
              user.displayName == message.name && "chat-message-sender"
            }`}
          >
            <span className="chat-message-name">{message.name}</span>
            {message.message}
            <span className="chat-message-time">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat-footer">
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <IconButton>
          <ProfileUpload extensions={fileTypes}>
            <AttachFile />
          </ProfileUpload>
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
