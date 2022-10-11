import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const ChatUserList = () => {
  const [chatList, setChatList] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChatList = () => {
      const unsub = onSnapshot(
        doc(db, "userChatList", currentUser.uid),
        (doc) => {
          setChatList(doc.data());
        }
      );

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChatList();
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <div className="chat-user">
      {Object.entries(chatList)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((list) => (
          <div
            className="chat-profile"
            key={list[0]}
            onClick={() => handleSelect(list[1].userInfo)}
          >
            <img src={list[1].userInfo.photoURL} alt="" />
            <div className="chat-user-info text-align">
              <h6>{list[1].userInfo.displayName}</h6>
              <span>{list[1].lastMessage?.text}</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChatUserList;
