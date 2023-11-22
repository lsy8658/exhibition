import { useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Header from "../../compoenets/header/Header";
import { Link } from "react-router-dom";
import "./style/register.css";
const Register = () => {
  const userId = useRef();
  const email = useRef();
  const password = useRef();
  const name = useRef();
  const navigate = useNavigate();

  const handler = async (e) => {
    e.preventDefault();
    const user = {
      userId: userId.current.value,
      email: email.current.value,
      password: password.current.value,
      name: name.current.value,
    };
    try {
      await axios.post(
        "https://port-0-exhibition-server-5mk12alp9ivd2d.sel5.cloudtype.app/api/auth/register",
        user
      );
      alert("회원가입되었습니다.");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("입력하신 정보를 다시 확인해주세요.");
    }
  };
  return (
    <>
      <Header />
      <div className="container">
        <div className="aside">
          <img src="/assets/images/art/img4.jpg" alt="" />
        </div>
        <div className="register">
          <h2>회원가입</h2>
          <form className="registerForm">
            <div className="inputBox">
              <input type="email" placeholder="ID" required ref={userId} />
            </div>
            <div className="inputBox">
              <input
                type="password"
                className="userPw"
                placeholder="PW"
                ref={password}
                required
              />
            </div>
            <div className="inputBox">
              <input type="email" placeholder="E.mail" required ref={email} />
            </div>

            <div className="inputBox">
              <input
                type="text"
                className="userPw"
                placeholder="Name"
                ref={name}
                required
              />
            </div>
            <button type="submit" className="loginButton" onClick={handler}>
              회원가입
            </button>
          </form>
          <div className="links">
            <li>
              <Link to={"/"}>...</Link>
            </li>
            <li>
              <Link to={"/login"}>로그인</Link>
            </li>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
