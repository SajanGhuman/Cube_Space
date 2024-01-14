import { useEffect, useState } from "react";
import "../App.css";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";

const LoginButton = () => {
  return (
    <div className="lr__div">
      <Link to="/login">
        <button className="login lr__button">LOGIN</button>
      </Link>
      <Link to="/register">
        <button className="register lr__button">REGISTER</button>
      </Link>
    </div>
  );
};

export default LoginButton;
