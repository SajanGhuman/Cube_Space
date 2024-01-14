import { useEffect, useState } from "react";
import "../App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Logout from "./logoutButton/";
import LOGIN from "./login";
import LoginButton from "./loginButton";

const LR = () => {
  const [change, setChange] = useState(Boolean);
  const navget = useNavigate();

  return (
    <div>
      {localStorage.getItem("login") === "false" ? (
        <div className="lr__div">
        <Link to="/login">
          <button className="login lr__button">LOGIN</button>
        </Link>
        <Link to="/register">
          <button className="register lr__button">REGISTER</button>
        </Link>
      </div>
      ) : (
        <div className="logout__div">
          <Logout />
        </div>
      )}
    </div>
  );
};

export default LR;
