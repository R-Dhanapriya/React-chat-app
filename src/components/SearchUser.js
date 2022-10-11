import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const SearchUser = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearchName = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setError(true);
    }
  };

  const handleKeyDown = (e) => {
    e.code === "Enter" && handleSearchName();
  };

  const handleSelectHandler = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const response = await getDoc(doc(db, "chatList", combinedId));

      console.log(response);
      if (!response.exists()) {
        await setDoc(doc(db, "chatList", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChatList", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChatList", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      setUser(null);
      setUserName("");
    }
  };

  return (
    <div className="search-container">
      <div className="search-form">
        <input
          type="text"
          placeholder="Find a User Name"
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handleKeyDown}
          value={userName}
        />
      </div>
      {error && <span>User does not Exist!</span>}

      {user && (
        <div className="user-chat" onClick={handleSelectHandler}>
          <img src={user.photoURL} alt="" />
          <div className="user-chat-info">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchUser;
