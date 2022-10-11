import React, { useState, useContext } from "react";
import { IoMdSend } from "@react-icons/all-files/io/IoMdSend";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { db } from "../firebase";

const ChatInputContainer = () => {
  const [msgText, setMsgText] = useState("");

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSendHandler = async () => {
    await updateDoc(doc(db, "chatList", data.chatId), {
      messages: arrayUnion({
        id: uuid(),
        text: msgText,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });

    await updateDoc(doc(db, "userChatList", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        msgText,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChatList", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        msgText,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setMsgText("");
  };

  const handleInputHndler = (e) => {
    setMsgText(e.target.value);
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        placeholder="Type a message..."
        value={msgText}
        onChange={handleInputHndler}
      />
      <button className="btn btn-container" onClick={handleSendHandler}>
        <IoMdSend className="icon-image" />
      </button>
    </div>
  );
};

export default ChatInputContainer;
