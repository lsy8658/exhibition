import "./style/upload.css";
import Subheader from "../../compoenets/subHeader/Subheader";
import { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

const Upload = ({ state }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  console.log(state.user.userId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: state.user.userId,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
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
      await axios.post(
        "https://sy-exhibition-app.herokuapp.com/api/post/",
        newPost
      );
      alert("작품이 성공적으로 업로드 되었습니다.");
      window.location.replace("/gallery");
    } catch (err) {
      alert("입력한 정보를 다시 한번 확인해주세요.");
      console.log(err);
    }
  };
  return (
    <div>
      <Subheader>UPLOAD</Subheader>
      <div className="upload">
        <form className="uploadContainer" onSubmit={handleSubmit}>
          <div className="side">
            {file === null ? (
              <div className="item">
                <div className="uploadTxt">
                  <div className="uploadBox">
                    <p>작품을 업로드해주세요.</p>
                  </div>
                  <div className="filebox">
                    <label htmlFor="file">작품 올리기</label>
                    <input
                      type="file"
                      id="file"
                      className="inputFile"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="item">
                <div className="uploadTxt">
                  <div className="imgbox">
                    <img src={URL.createObjectURL(file)} alt="" />
                  </div>
                  <div className="filebox">
                    <label htmlFor="file">작품 변경하기</label>
                    <input
                      type="file"
                      id="file"
                      className="inputFile"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="textWrap">
            <div className="uploadTxt">
              <div className="inputBox">
                <input
                  type="text"
                  placeholder="Title"
                  onChange={(e) => setTitle(e.currentTarget.value)}
                />
              </div>
              <div className="inputBox">
                <textarea
                  type="text"
                  placeholder="Description"
                  onChange={(e) => setDesc(e.currentTarget.value)}
                />
              </div>
              <button type="submit" className="submitBtn">
                작품 업로드
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export const reducer = ({ loginReducer }) => {
  return { state: loginReducer.user };
};

export default connect(reducer)(Upload);
