import React, { useState, useContext, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from "../context/ChatContext";
import Chat from "./Chat";
import ChatInputContainer from "./ChatInputContainer";
import ChatUserList from "./ChatUserList";
import Navbar from "./Navbar";
import SearchUser from "./SearchUser";
import { db } from "../firebase";

const Sidebar = () => {
  const [messages, setMessages] = useState([]);

  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chatList", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className="sidebar border-radius-10">
      <div className="row">
        <div className="col-12 col-xl-12">
          <Navbar />
          <div className="row min-height mt-3 d-flex">
            <div className="col-12 d-flex justify-content-center">
              <div className="col-md-4 col-lg-4 d-flex">
                <div className="card margin-card margin-right-7 border-radius">
                  <div className="card-body">
                    <SearchUser />
                    <ChatUserList />
                  </div>
                </div>
              </div>
              <div className="col-md-8 col-lg-8 d-flex ">
                <div className="card margin-card margin-left-7 border-radius b-none">
                  <div className="card-body">
                    <div className="chat-messages">
                      {messages.map((msg) => (
                        <Chat message={msg} key={msg.id} />
                      ))}
                    </div>
                    <ChatInputContainer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
