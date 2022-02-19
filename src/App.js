import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";
import { connect } from "react-redux";
import Search from "./pages/search_id/Search";
import Upload from "./pages/upload/Upload";
import Gallery from "./pages/gallery/Gallery";
import Profile from "./pages/profile/Profile";
import Artist from "./pages/artist/Artist";
import Nomatch from "./pages/nomatch/Nomatch";
import Modify from "./pages/modify/Modify";
function App({ loginReducer }) {
  const [user, setUser] = useState("");
  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, [loginReducer]);

  console.log(user);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={user ? <Main /> : <Login />} />
        <Route path="/search" element={user ? <Main /> : <Search />} />
        <Route path="/register" element={user ? <Main /> : <Register />} />
        <Route path="/login" element={user ? <Main /> : <Login />} />
        <Route path="/upload" element={user ? <Upload /> : <Login />} />
        <Route path="/gallery" element={user ? <Gallery /> : <Login />} />
        <Route path="/:artistId" element={user ? <Artist /> : <Login />} />
        <Route path="/profile" element={user ? <Profile /> : <Login />} />
        <Route path="/modify/:id" element={user ? <Modify /> : <Login />} />
        <Route path="*" element={<Nomatch />} />
        {/* <Route path="/profile" element={<Artist />} /> */}
      </Routes>
    </div>
  );
}

export const reducers = ({ loginReducer }) => {
  return { loginReducer };
};

export default connect(reducers)(App);
