import { useRef } from "react";
import { connect } from "react-redux";
import axios from "axios";
import "./style/login.css";
import { login_start, login_success, login_failure } from "../../redux/actions";
import Header from "../../compoenets/header/Header";
import { Link } from "react-router-dom";

const Login = ({ state, login_start, login_success, login_failure }) => {
  const userId = useRef();
  const password = useRef();
  const isFetching = state.isFetching;

  const handler = async (e) => {
    e.preventDefault();
    const user = {
      userId: userId.current.value,
      password: password.current.value,
    };
    try {
      login_start();
      const res = await axios.post(
        "https://port-0-exhibition-server-5mk12alp9ivd2d.sel5.cloudtype.app/api/auth/login",
        user
      );
      login_success({ user: res.data });
      alert("로그인 되었습니다.");
      window.location.replace("/");
    } catch (err) {
      login_failure();
      console.log(err);
      alert("정보가 일치하지 않습니다.");
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="aside">
          <img src="/assets/images/art/img3.jpg" alt="" />
        </div>
        <div className="login">
          <h2>로그인</h2>
          <form className="loginForm">
            <div className="inputBox">
              <input
                type="text"
                className="userId"
                placeholder="ID"
                ref={userId}
              />
            </div>
            <div className="inputBox">
              <input
                type="password"
                className="userPw"
                placeholder="Password"
                ref={password}
              />
            </div>
            <button
              type="submit"
              onClick={handler}
              className="loginButton"
              disabled={isFetching}
            >
              {isFetching ? "준비중" : "Login"}
            </button>
          </form>

          <div className="links">
            <li>
              <Link to={"/search"}>아이디 찾기</Link>
            </li>
            <li>
              <Link to={"/register"}>회원가입</Link>
            </li>
          </div>
        </div>
      </div>
    </>
  );
};

export const reducers = ({ loginReducer }) => {
  return { state: loginReducer };
};

const actions = {
  login_start,
  login_success,
  login_failure,
};

export default connect(reducers, actions)(Login);
