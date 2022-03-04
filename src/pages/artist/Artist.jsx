import "./style/artist.css";
import Subheader from "../../compoenets/subHeader/Subheader";
import axios from "axios";
import { useState, useRef } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { connect } from "react-redux";

const Artist = ({ state }) => {
  const { artistId } = useParams();
  const [postData, setPostData] = useState({}); //해당 post id
  const [like, setLike] = useState([]);
  const [userId, setUserId] = useState(""); // 작성자 id
  const [arts, setArts] = useState([]); // 작성자의 다른 게시물
  const [loginUser, setLoginUser] = useState("");
  const [artist, setArtist] = useState([]); //해당 게시물 작성자
  const [heart, setHeart] = useState([]);

  const description = useRef();
  const [linkMenu, setlinkMenu] = useState(false);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  console.log(users);
  useEffect(() => {
    const result = async () => {
      try {
        const res = await axios.get(
          `https://sy-exhibition-app.herokuapp.com/api/artist/${artistId}`
        );
        console.log(res.data.comments);
        setHeart(res.data.likes);
        const likes = res.data.likes.filter((item) => {
          return item !== "";
        });
        setLike(likes);
        // -------------------------------------------------------------
        const data = await axios.get(
          `https://sy-exhibition-app.herokuapp.com/api/artist/userId/${artistId}`,
          artistId
        );
        const user = data.data.user;
        const post = res.data.comments;
        setPosts(post);

        console.log(user);

        const postId = post.map((item) => {
          return user.filter((i) => {
            return i.userId === item.userId && i;
          });
        });

        setUsers(postId);
      } catch (err) {
        console.log(err);
      }
    };
    result();
  }, [artistId]);

  useEffect(() => {
    setLoginUser(state.user.user.userId);
  }, [state, loginUser]);

  useEffect(() => {
    const render = async () => {
      try {
        const res = await axios.get(
          `https://sy-exhibition-app.herokuapp.com/api/artist/${artistId}`
        );
        setPostData(res.data);

        setUserId(res.data.userId);
      } catch (err) {
        console.log(err);
      }
    };
    render();
  }, [artistId]);

  useEffect(() => {
    const data = {
      id: userId,
    };
    const arts = async () => {
      try {
        const res = await axios.get(
          "https://sy-exhibition-app.herokuapp.com/api/artist",
          data
        );

        const userArts = res.data.arts.filter((art) => {
          return (artistId !== art._id) & (art.userId === userId);
        });
        const user = res.data.user.filter((user) => {
          return userId === user.userId;
        });

        setArtist(user);
        setArts(userArts);
      } catch (err) {
        console.log(err);
      }
    };
    arts();
  }, [userId, artistId]);

  const linkHandler = () => {
    if (linkMenu === true) {
      setlinkMenu(false);
    } else {
      setlinkMenu(true);
    }
  };
  const deleteHandler = async () => {
    try {
      const res = await axios.delete(
        `https://sy-exhibition-app.herokuapp.com/api/artist/${artistId}`
      );
      window.location.replace("/gallery");
      console.log(res);

      alert("해당 작품을 삭제하였습니다.");
    } catch (err) {
      console.log(err);
    }
  };
  // loginUser
  const heartHandler = async () => {
    const data = {
      loginId: loginUser,
      artId: artistId,
    };

    try {
      const res = await axios.put(
        `https://sy-exhibition-app.herokuapp.com/api/artist/${artistId}`,
        data
      );
      setHeart(res.data.likes);
      console.log(res);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const chatHandler = async (e) => {
    e.preventDefault();

    const data = {
      userId: loginUser,
      desc: description.current.value,
    };

    try {
      const res = await axios.put(
        `https://sy-exhibition-app.herokuapp.com/api/artist/comment/${artistId}`,
        data
      );
      window.location.reload();
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const commentDelete = async (e) => {
    const deletekey = e.target.attributes.value.value;
    const data = {
      key: deletekey,
    };
    try {
      const res = await axios.put(
        `https://sy-exhibition-app.herokuapp.com/api/artist/delete/${artistId}`,
        data
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    window.location.reload();
  };

  return (
    <div className="artist">
      <Subheader nav={"/gallery"} />
      <div className="artistCon">
        <div className="artistWrap">
          <div className="asidewrap">
            <div className="aside">
              <div className="sideHeader">
                <div className="profilePic">
                  <Link to={"/"}>
                    {artist.map((user, index) => {
                      return user.profilePic ? (
                        <img
                          key={index}
                          src={`https://sy-exhibition-app.herokuapp.com/image/${user.profilePic}`}
                          alt=""
                        />
                      ) : (
                        <img src={`/assets/images/icon/profile2.png`} alt="" />
                      );
                    })}
                  </Link>
                  <p>{postData.userId}</p>
                </div>
                <div
                  className="buttons"
                  style={{ display: userId === loginUser ? "block" : "none" }}
                >
                  <Link to={`/modify/${artistId}`}>
                    <img src="/assets/images/icon/modify1.png" alt="" />
                  </Link>
                  <button onClick={deleteHandler}>
                    <img src="/assets/images/icon/delete.png" alt="" />
                  </button>
                </div>
              </div>
              <div className="sideBody">
                <div className="artPic">
                  {postData.photo ? (
                    <img
                      src={`https://sy-exhibition-app.herokuapp.com/image/${postData.photo}`}
                      alt=""
                    />
                  ) : (
                    "로딩중입니다."
                  )}
                </div>
                <div className="heart">
                  <span className="heartCount">+{like.length}</span>
                  <img
                    src={`/assets/images/icon/${
                      heart.indexOf(loginUser) !== -1
                        ? "heart.png"
                        : "heartOff.png"
                    }`}
                    alt=""
                    onClick={heartHandler}
                  />
                </div>
              </div>
              <div className="artMenuCon1">
                <div className="artMenu">
                  {arts.map((art, index) => (
                    <Link to={`/${art._id}`} key={index}>
                      <img
                        src={`https://sy-exhibition-app.herokuapp.com/image/${art.photo}`}
                        alt=""
                      />
                    </Link>
                  ))}
                </div>
              </div>
              <div
                className="artMenuCon"
                style={{ bottom: linkMenu === true ? `0` : `-40vh` }}
              >
                <div className="menulinkMenu">
                  <button
                    onClick={() => {
                      linkHandler();
                    }}
                  >
                    See more
                  </button>
                </div>
                <div className="artMenu">
                  {arts.map((art, index) => (
                    <Link to={`/${art._id}`} key={index}>
                      <img
                        src={`https://sy-exhibition-app.herokuapp.com/image/${art.photo}`}
                        alt=""
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="artbox">
            <div className="artTxt">
              <p className="artTitle">{postData.title}</p>
              <div className="artDesc">{postData.desc}</div>
              <div className="commentsCon">
                {posts.map((item, index) => {
                  return (
                    <div className="comment" key={item.key}>
                      <div className="commentBox">
                        <div className="commentHead">
                          <Link to={"/"}>
                            {/* {users.userId === item.userId ? (
                              <img
                                src={`https://sy-exhibition-app.herokuapp.com/image/}`}
                                alt=""
                              />
                            ) : (
                              <img
                                src={`/assets/images/icon/profile2.png`}
                                alt=""
                              />
                            )} */}
                            <img
                              src={`/assets/images/icon/profile2.png`}
                              alt=""
                            />
                            <span>{item.userId}</span>
                          </Link>
                        </div>
                        <div className="commentDesc">
                          <p>{item.desc}</p>
                        </div>
                      </div>
                      {item.userId === loginUser && (
                        <img
                          src="/assets/images/icon/x.png"
                          alt=""
                          value={item.key}
                          onClick={commentDelete}
                          className="commentDelete"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              <form className="commentForm" onSubmit={chatHandler}>
                <input type="text" ref={description} />
                <button type="submit" className="commentBtn">
                  작성
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const reducer = ({ loginReducer }) => {
  return { state: loginReducer };
};
export default connect(reducer)(Artist);
