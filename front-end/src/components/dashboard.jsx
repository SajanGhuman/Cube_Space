import { useEffect, useState } from "react";
import "../App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

const Dashboard = () => {
  return localStorage.getItem("access") === "1" ? (
    <AdminDashboard />
  ) : (
    <UserDashboard />
  );
};

export default Dashboard;
