import React, { useEffect, useRef, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Chat = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const scrollref = useRef();

  useEffect(() => {
    scrollref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div className="chat-container" ref={scrollref}>
      <div
        className={`"chat-message-container" ${
          message.senderId === currentUser.uid && "user-text"
        }`}
      >
        <div className="chat-message-content">
          <img
            src={
              message.senderId === currentUser.uid
                ? currentUser.photoURL
                : data.user.photoURL
            }
            alt=""
          />
          <p>{message.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Chat;
