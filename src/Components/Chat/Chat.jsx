import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  KeyboardVoice,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import "./Chat.css";

function Chat() {
  const [seed, setSeed] = useState("");
  const [typeMessage, setTypeMessage] = useState();

  useEffect(() => {
    setSeed(Math.random() * 5000);
  }, []);

  function sendMessage(e) {
    e.preventDefault();
    alert(typeMessage);
  }

  return (
    <div className="chat">
      <div className="chat-header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat-header-info">
          <h3>Cute Toh Hai Bhai</h3>
          <p>Last seen at 2:00 p.m.</p>
        </div>
        <div className="chat-header-right">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat-body">
        <p className="chat-message">
          Welcome to Whatsapp Web! <span>Time-stamp</span>
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
