import React from "react";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <section className="vh-100 image-container">
      <div className="container ">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col col-xl-12 shadow-5 text-center margin-top-20">
            <div className="card card-border-radius">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
