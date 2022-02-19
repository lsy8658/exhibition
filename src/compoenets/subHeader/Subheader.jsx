import "./style/subheader.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import Menu from "../menu/Menu";
import axios from "axios";
const Subheader = ({ children, setSearchArt, nav }) => {
  const [menu, setMenu] = useState(false);
  const [userId, setUserid] = useState("");
  const navigate = useNavigate();

  const menuHandler = () => {
    if (menu === true) {
      setMenu(false);
    } else {
      setMenu(true);
    }
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    const res = await axios.get(
      `https://sy-exhibition-app.herokuapp.com/api/post/${userId}`
    );
    setSearchArt(res.data);
  };

  return (
    <div className="subHeader">
      <Menu state={menu} />
      <div className="headerWrap">
        <div className="headerSide">
          <img
            src="/assets/images/icon/prev.png"
            alt=""
            onClick={() => {
              nav ? navigate(nav) : navigate(-1);
            }}
          />
          <h1>{children}</h1>
        </div>

        <div className="menuBtn">
          <form
            className="searchForm"
            style={{ display: "none" }}
            onSubmit={searchHandler}
          >
            <input
              type="text"
              placeholder="아티스트의 ID를 적어주세요."
              onChange={(e) => {
                setUserid(e.target.value);
              }}
            />
            <button className="searchIcon" type="submit">
              <img
                className="searchImg"
                src="/assets/images/icon/search.png"
                alt=""
              />
            </button>
          </form>

          <img
            src="/assets/images/icon/A.png"
            alt=""
            onClick={menuHandler}
            style={{
              transform: `
                rotate(${menu ? "0.5" : "0"}turn)
                 `,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Subheader;
