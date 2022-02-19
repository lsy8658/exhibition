import "./style/header.css";
import { useState, useEffect } from "react";
const Header = () => {
  const [logo, setLogo] = useState(0);

  useEffect(() => {
    let time = setTimeout(() => {
      if (logo < 4) {
        setLogo(logo + 1);
      } else {
        setLogo(0);
      }
    }, 2000);
    return () => clearTimeout(time); //더이상 하지 않게
  }, [logo]);
  // 에러의 이유는
  // useEffect 내부의 내용이 이미 지나버린 페이지에 대해서 동작하였기 때문입니다.
  //cleanup function 사용하기
  return (
    <div className="headerCon">
      <div className="header">
        <img src={`/assets/images/logo/logo${logo}.png`} alt="" />
        <h1>Gallery</h1>
      </div>
    </div>
  );
};

export default Header;
