import { useEffect, useState } from "react";
import "../App.css";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";

const Logout = () => {
  const navget = useNavigate();
  const handleLogoutClick = () => {
    setTimeout(() => {
      localStorage.setItem("login", "false");
      localStorage.setItem("access", "");
      localStorage.setItem("name", "");
      localStorage.setItem("email", "");
      navget("/");
      window.location.reload();
    }, 2000);
  };

  return (
    <div>
      <button className="logout__button" onClick={handleLogoutClick}>
        Log Out
      </button>
    </div>
  );
};

export default Logout;
