import { useEffect, useState } from "react";
import "../App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Cube from "./cube";

const Navbar = () => {
  return (
    <nav>
      {localStorage.getItem("login") === "true" ? (
        <ul className="nav__ul">
          <li>
            <Link to="/">
              <Cube />
            </Link>
          </li>
          <li>
            <Link to="/dashboard">DASHBOARD</Link>
          </li>
        </ul>
      ) : (
        <ul className="nav__ul">
          <li>
            <Link to="/">
              <Cube />
            </Link>
          </li>
          <li>
            <Link to="/content">ALGORITHMS</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
