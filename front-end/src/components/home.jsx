import "../App.css";
import { Routes, Route, Link } from "react-router-dom";
import Cube from "./cube";

const Home = () => {
  return (
    <div>
      <div className="main__home__div">
        <h1 className="intro__title">CUBE SPACE</h1>
        <h1 className="intro__text">
          <span className="yellow">WANT TO CUBE?</span>
          <span className="white"> YOU ARE AT THE RIGHT PLACE.</span>
        </h1>
        <p className="intro__text__para">
          Gain access to all the cubing resources you will ever need.
          <span className="yellow">FREE OF COST</span>
        </p>
      </div>
    </div>
  );
};

export default Home;
