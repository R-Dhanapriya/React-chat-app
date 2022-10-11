import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const logOut = () => {
    signOut(auth);
    navigate("/signin");
  };

  return (
    <div className="navbar-container mt-2">
      <div className="navbar-logo">
        <div className="navbar-image">
          <img src={currentUser.photoURL} alt="" />
          <h3>{currentUser.displayName}</h3>
          <span>Chat BoT</span>
        </div>
        <button onClick={logOut}>Logout</button>{" "}
      </div>
    </div>
  );
};

export default Navbar;
