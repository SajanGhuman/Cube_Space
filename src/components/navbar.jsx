import "../App.css";
import { Link } from "react-router-dom";
import Cube from "./cube";
import { useState } from "react";
import React from "react";

const Navbar = () => {
  const [menuClass, setMenuClass] = useState({
    active: "true",
    "main-class": "menu-button",
    "all-class": "menu",
    "nav-div": "hidden",
    "nav-ul": "hidden",
  });

  const handleClick = () => {
    menuClass.active === "true"
      ? setMenuClass({
          active: "false",
          "main-class": "cross-button",
          "all-class": "cross",
          "nav-div": "right-nav",
          "nav-ul": "nav-ul",
        })
      : setMenuClass({
          active: "true",
          "main-class": "menu-button",
          "all-class": "menu",
          "nav-div": "hidden",
          "nav-ul": "hidden",
        });
  };

  return (
    <nav>
      <div className="search__img__div">
        <img src="/search.png" className="search__img" alt="" />
      </div>
      {localStorage.getItem("login") === "true" ? (
        <React.Fragment>
          <ul className="nav__ul">
            <li>
              <Link to="/">
                <Cube />
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="dash-nav">DASHBOARD</Link>
            </li>
          </ul>
          <div className={`${menuClass["main-class"]}`} onClick={handleClick}>
            <div
              className={`${menuClass["all-class"]} ${menuClass["all-class"]}-1`}
            ></div>
            <div
              className={`${menuClass["all-class"]} ${menuClass["all-class"]}-2`}
            ></div>
            <div
              className={`${menuClass["all-class"]} ${menuClass["all-class"]}-3`}
            ></div>
          </div>
          <div className={`${menuClass["nav-div"]}`}>
            <ul className={`nav - ul ${menuClass["nav-ul"]}`}>
              <li>Home</li>
              <li>Login</li>
              <li>Register</li>
            </ul>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <ul className="nav__ul">
            <li className="cube_ul">
              <Link to="/">
                <Cube />
              </Link>
            </li>
            <li className="alg-nav">
              <Link to="/content">ALGORITHMS</Link>
            </li>
          </ul>
          <div className={`${menuClass["main-class"]}`} onClick={handleClick}>
            <div
              className={`${menuClass["all-class"]} ${menuClass["all-class"]}-1`}
            ></div>
            <div
              className={`${menuClass["all-class"]} ${menuClass["all-class"]}-2`}
            ></div>
            <div
              className={`${menuClass["all-class"]} ${menuClass["all-class"]}-3`}
            ></div>
          </div>
          <div className={`${menuClass["nav-div"]}`}>
            <ul className={`nav - ul ${menuClass["nav-ul"]}`}>
              <li>Home</li>
              <li>Login</li>
              <li>Register</li>
            </ul>
          </div>
        </React.Fragment>
      )}
    </nav>
  );
};

export default Navbar;
