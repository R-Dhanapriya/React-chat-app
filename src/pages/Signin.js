import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Signin = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
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
                <div className="col-md-6 col-lg-6 d-flex align-items-center color-form image-border-radius">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center mb-5 pb-1">
                        <i className="fas fa-cubes fa-2x me-3"></i>
                        <span className="h1 fw-bold mb-0">Sign In</span>
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
                      <div className="mt-4">
                        <button
                          className=" button-container w-100"
                          type="submit"
                        >
                          Sign In
                        </button>
                      </div>
                      {errorMsg && (
                        <span className="error-msg mt-2">{errorMsg}</span>
                      )}
                    </form>
                    <div className="mt-4 text-center">
                      <span className="mb-0">
                        Don't have an account ?{" "}
                        <Link to={"/signup"} className="fw-semibold">
                          <span className="mb-0">Sign up</span>
                        </Link>{" "}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-lg-6 d-none d-md-block card-border-radius image-h-w">
                  <img
                    src="../Images/login.png"
                    alt="login form"
                    className="img-fluid image-border-radius"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
