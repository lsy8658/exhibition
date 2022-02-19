import "./style/profile.css";
import Subheader from "../../compoenets/subHeader/Subheader";
import { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  modify_start,
  modify_success,
  modify_failure,
} from "../../redux/actions";

const Profile = ({ state, modify_start, modify_success, modify_failure }) => {
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [userInfo, setUserInfo] = useState(state.user);
  console.log(newPassword.length);

  const passwordCh = () => {
    if (password1 === password2) {
      setnewPassword(password1);
      alert("비밀번호가 설정되었습니다.");
      setModal(false);
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };
  console.log(userInfo);
  const profileHandler = async (e) => {
    if (newPassword === "") {
      alert("암호를 입력해주세요.");
      return false;
    }

    e.preventDefault();
    const updatedUser = {
      userId: userInfo.userId,
      password: newPassword,
      email: email === "" ? userInfo.email : email,
      name: name === "" ? userInfo.name : name,
    };
    modify_start();

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post(
          "https://sy-exhibition-app.herokuapp.com/api/upload",
          data
        );
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.put(
        `https://sy-exhibition-app.herokuapp.com/api/user/` + userInfo._id,
        updatedUser
      );
      console.log(res.data);
      modify_success(res.data);
      alert("수정이 완료되었습니다.");
      window.location.replace("/");
    } catch (err) {
      modify_failure();
    }
  };
  return (
    <div>
      <Subheader>Profile</Subheader>
      <div className="profileContainer">
        <form onSubmit={profileHandler}>
          <div className="aside">
            <div className="profilePic">
              <div className="imgs">
                {file ? (
                  <img src={URL.createObjectURL(file)} alt="" />
                ) : (
                  <img
                    src={
                      userInfo.profilePic === ""
                        ? "/assets/images/icon/profile.png"
                        : `https://sy-exhibition-app.herokuapp.com/image/${userInfo.profilePic}`
                    }
                    alt=""
                  />
                )}
                <div className="fileUpload">
                  <label htmlFor="profile">
                    <img src="/assets/images/icon/modify1.png" alt="" />
                  </label>
                  <input
                    type="file"
                    id="profile"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                  />
                </div>
              </div>
              <p>{userInfo.userId}</p>
            </div>
          </div>
          <div className="modify">
            <div className="userInfo">
              <div className="inputbox">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  placeholder={userInfo.email}
                  id="email"
                  onChange={(e) => {
                    setEmail(e.currentTarget.value);
                  }}
                />
              </div>
              <div className="inputbox">
                <label htmlFor="name">name</label>
                <input
                  type="text"
                  placeholder={userInfo.name}
                  id="name"
                  onChange={(e) => {
                    setName(e.currentTarget.value);
                  }}
                />
              </div>
              <div
                className="passwordModal"
                style={{ display: modal ? "block" : "none" }}
              >
                <div
                  className="modalBg"
                  onClick={() => {
                    setModal(false);
                  }}
                ></div>
                <div className="passwordBox">
                  <div className="inputbox">
                    <input
                      type="password"
                      placeholder="비밀번호 입력"
                      minLength={6}
                      onChange={(e) => {
                        setPassword1(e.currentTarget.value);
                      }}
                    />
                  </div>
                  <div className="inputbox">
                    <input
                      type="password"
                      minLength={6}
                      placeholder="비밀번호 재입력"
                      onChange={(e) => {
                        setPassword2(e.currentTarget.value);
                      }}
                    />
                  </div>
                  <div className="btns">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        passwordCh();
                      }}
                    >
                      확인
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setModal(false);
                      }}
                    >
                      취소
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  setModal(true);
                }}
              >
                비밀번호 수정
              </button>
              <button type="submit">수정하기</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const actions = {
  modify_start,
  modify_success,
  modify_failure,
};
export const reducer = ({ modifyReducer }) => {
  return { state: modifyReducer.user };
};
export default connect(reducer, actions)(Profile);
