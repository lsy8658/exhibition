import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../../compoenets/header/Header";
import "./style/search.css";
const Search = () => {
  const [email, setEmail] = useState("");
  const [userId, setUserid] = useState("");
  const handler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://sy-exhibition-app.herokuapp.com/api/auth/search",
        {
          email,
        }
      );
      setUserid(res.data[0].userId);
    } catch (err) {
      console.log(err);
      alert("찾으시는 ID가 없습니다.");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="aside">
          <img src="/assets/images/bg/search1.png" alt="" />
        </div>
        <div className="search">
          {userId === "" ? (
            <div className="searchBox">
              <p>ID 찾기</p>
            </div>
          ) : (
            <div className="searchBox">
              <p>조회하신 아이디는</p>
              <p>
                <span>{userId}</span> 입니다.
              </p>
            </div>
          )}

          <form onSubmit={handler} className="searchForm">
            <div className="inputBox">
              <input
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  console.log(e.target.value);
                }}
                placeholder="email을 입력해주세요."
              />
            </div>
            <button type="submit" className="searchButton">
              아이디 검색
            </button>
          </form>
          <div className="links">
            <Link to={"/login"}>돌아가기</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
