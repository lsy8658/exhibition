import "./style/menu.css";

import { Link } from "react-router-dom";
import { logout } from "../../redux/actions";
import { connect } from "react-redux";
const Menu = ({ state, logout }) => {
  return (
    <div className="menuContainer">
      <div
        className="menu"
        style={{
          right: `
                ${state ? "0%" : "-100%"}
                 `,
          display: ` ${state ? "block" : "none"}`,
        }}
      >
        <div className="main">
          <ul className="links">
            <li className="link">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="link">
              <Link to={"/profile"}>Profile</Link>
            </li>
            <li className="link">
              <Link to={"/gallery"}>Gallery</Link>
            </li>

            <li className="link">
              <Link to={"/upload"}>Upload</Link>
            </li>

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
  return { loginReducer };
};
export default connect(reducers, actions)(Menu);
