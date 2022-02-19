import React from "react";
import "./style/main.css";
import { connect } from "react-redux";
import { logout } from "../../redux/actions";
import Header from "../../compoenets/header/Header";
import { Link } from "react-router-dom";

const Main = ({ logout, user }) => {
  return (
    <div className="mainBg">
      <Header />
      <div className="container">
        <div className="aside">
          <img src="/assets/images/main/mainbg.jpg" alt="" />
        </div>
        <div className="main">
          <ul className="links">
            <li className="link">
              <Link to={"/gallery"}>Gallery</Link>
            </li>
            {/* <li className="link">
              <Link to={"/"}>My Gallery</Link>
            </li> */}
            <li className="link">
              <Link to={"/profile"}>Profile</Link>
            </li>
            <li className="link">
              <Link to={"/profile"}>Profile</Link>
            </li>
            {/* <li className="link">
              <Link to={"/"}>About the page</Link>
            </li> */}
            <li className="link">
              <button
                onClick={() => {
                  logout();
                  alert("로그아웃 되었습니다.");
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const actions = {
  logout,
};

export const reducers = ({ loginReducer }) => {
  return { user: loginReducer.user };
};
export default connect(reducers, actions)(Main);
