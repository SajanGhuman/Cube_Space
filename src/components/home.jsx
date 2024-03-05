import "../App.css";
import { useState } from "react";
import Mask from "./mask";
import { Link } from "react-router-dom";

const Home = () => {
  const [cursorVariant, setCursorVariant] = useState("default");

  const mouseEnter = () => {
    setCursorVariant("text");
    console.log(cursorVariant);
  };

  const mouseLeave = () => {
    setCursorVariant("default");
    console.log(cursorVariant);
  };

  return (
    <div className="home__container">
      <div
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
        className="main__home__div"
      >
        <h1 className="intro__title">CUBE SPACE</h1>
        <span className="intro_para-2">
          WANT TO CUBE?
          <span className="intro_para-3"> YOU ARE AT THE RIGHT PLACE.</span>
        </span>
      </div>
      <div>
        <Link to="/content">
          <button className="alg-button">Algorithms</button>
        </Link>
      </div>
      {/* <Cursor cursorVariant={cursorVariant} /> */}
      <Mask cursorVariant={cursorVariant} />
    </div>
  );
};

export default Home;
