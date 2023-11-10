import { useEffect, useState } from "react";
import "../App.css";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";

const Logout = ({ onLogout }) => {
  const handleLogoutClick  = () => {
    setTimeout(onLogout(), 2000);
  };

  return (
    <div>
      <button className="logout__button" onClick={handleLogoutClick }>
        Log Out
      </button>
    </div>
  );
};

export default Logout;
