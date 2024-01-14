import "../App.css";
import { Routes, Route, Link } from "react-router-dom";
import Cube from "./cube";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Cursor from "./cursor";
import Mask from "./mask";

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
        <span className="green">
          WANT TO CUBE?
          <span className="white"> YOU ARE AT THE RIGHT PLACE.</span>
        </span>
        <p className="intro__text__para bold green">
          GAIN ACCESS TO ALL THE CUBING RESOURCES YOU WILL EVER NEED.
          <span className="white"> FREE OF COST</span>
        </p>
      </div>
      {/* <Cursor cursorVariant={cursorVariant} /> */}
      <Mask cursorVariant={cursorVariant}/>
    </div>
  );
};

export default Home;
