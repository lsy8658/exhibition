import "./style/gallery.css";
import Subheader from "../../compoenets/subHeader/Subheader";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [searchArt, setSearchArt] = useState(null);
  useEffect(() => {
    const imageLoad = async () => {
      try {
        const res = await axios.get(
          "https://sy-exhibition-app.herokuapp.com/api/post/"
        );
        searchArt == null ? setImages(res.data) : setImages(searchArt);
      } catch (err) {
        console.log(err);
      }
    };
    imageLoad();
  }, [searchArt]);

  return (
    <div className="gallery">
      <Subheader setSearchArt={setSearchArt} />
      <div className="galleryContainer">
        {images.map((img, index) => (
          <Link to={`/${img._id}`} key={index} className="artwork">
            <img
              src={`https://sy-exhibition-app.herokuapp.com/image/${img.photo}`}
              alt=""
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
