import "./style/modify.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";
import axios from "axios";
import Subheader from "../../compoenets/subHeader/Subheader";

const Modify = ({ state }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const param = useParams().id;

  useEffect(() => {
    const render = async () => {
      try {
        const res = await axios.get(
          `https://port-0-exhibition-server-5mk12alp9ivd2d.sel5.cloudtype.app/api/post/modify/${param}`
        );
        const postData = res.data;

        setData(postData);
      } catch (err) {
        console.log(err);
      }
    };
    render();
  }, [param]);
  console.log(data);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: state.user.userId,
      title: title === "" ? data.title : title,
      desc: desc === "" ? data.desc : desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post(
          "https://port-0-exhibition-server-5mk12alp9ivd2d.sel5.cloudtype.app/api/upload",
          data
        );
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.put(
        `https://port-0-exhibition-server-5mk12alp9ivd2d.sel5.cloudtype.app/api/post/${param}`,
        newPost
      );
      window.location.replace("/gallery");
      alert("작품이 성공적으로 수정 되었습니다.");
    } catch (err) {
      window.location.replace("/gallery");
      console.log(err);
    }
  };

  return (
    <div>
      <Subheader>MODIFY</Subheader>
      <div className="upload">
        <form className="uploadContainer" onSubmit={handleSubmit}>
          <div className="side">
            {file === null ? (
              data !== "" ? (
                data.map((item, index) => {
                  return (
                    <div className="item" key={index}>
                      <div className="uploadTxt">
                        <div className="imgbox">
                          <img
                            src={`https://port-0-exhibition-server-5mk12alp9ivd2d.sel5.cloudtype.app/image/${item.photo}`}
                            alt=""
                          />
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
                  );
                })
              ) : (
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
              )
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
          {data !== "" ? (
            data.map((item, index) => (
              <div className="textWrap" key={index}>
                <div className="uploadTxt">
                  <div className="inputBox">
                    <input
                      type="text"
                      placeholder={item.title}
                      onChange={(e) => setTitle(e.currentTarget.value)}
                    />
                  </div>
                  <div className="inputBox">
                    <textarea
                      type="text"
                      placeholder={item.desc}
                      onChange={(e) => setDesc(e.currentTarget.value)}
                    />
                  </div>
                  <button type="submit" className="submitBtn">
                    작품 업로드
                  </button>
                </div>
              </div>
            ))
          ) : (
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
          )}
        </form>
      </div>
    </div>
  );
};

export const reducer = ({ loginReducer }) => {
  return { state: loginReducer.user };
};

export default connect(reducer)(Modify);
