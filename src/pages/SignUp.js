import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setErrorMsg(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChatList", res.user.uid), {});
            navigate("/signin");
          });
        }
      );
    } catch (error) {
      setErrorMsg(true);
    }
  };

  return (
    <section className="vh-100 image-container">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10 p-5 shadow-5 text-center">
            <div className="card card-border-radius">
              <div className="row g-0 card-border-radius">
                <div className="col-md-6 col-lg-6 d-none d-md-block card-border-radius image-h-w">
                  <img
                    src="../Images/signup.png"
                    alt="login form"
                    className="img-fluid image-border-radius"
                  />
                </div>
                <div className="col-md-6 col-lg-6 d-flex align-items-center color-form image-border-radius">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center mb-5 pb-1">
                        <i className="fas fa-cubes fa-2x me-3"></i>
                        <span className="h1 fw-bold mb-0">Sign up</span>
                      </div>

                      <div className="mb-3 text-align">
                        <label htmlFor="username" className="form-label">
                          Username
                        </label>

                        <input
                          type="text"
                          className="input-control"
                          id="username"
                          placeholder="Enter username"
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter username
                        </div>
                      </div>
                      <div className="mb-3 text-align">
                        <label htmlFor="useremail" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="input-control"
                          id="useremail"
                          placeholder="Enter email address"
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter email
                        </div>
                      </div>
                      <div className="mb-2 text-align">
                        <label htmlFor="userpassword" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          className="input-control"
                          id="userpassword"
                          placeholder="Enter password"
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter password
                        </div>
                      </div>
                      <div className="mb-2 text-align image-size-h">
                        <input
                          required
                          style={{ display: "none" }}
                          type="file"
                          id="file"
                        />
                        <label htmlFor="file">
                          <img src="../Images/avatar.png" alt="" />
                          <span> Add an avatar</span>
                        </label>
                      </div>
                      <div className="mt-4">
                        <button
                          className=" button-container w-100"
                          type="submit"
                        >
                          Sign Up
                        </button>
                      </div>
                      {errorMsg && (
                        <span className="error-msg mt-2">{errorMsg}</span>
                      )}
                    </form>
                    <div className="mt-4 text-center">
                      <span className="mb-0">
                        Already have an account ?{" "}
                        <Link to={"/signin"} className="fw-semibold">
                          <span className="mb-0">Signin</span>
                        </Link>{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
