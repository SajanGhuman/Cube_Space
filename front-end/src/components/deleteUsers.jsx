import "../App.css";
import { useEffect, useState, useContext, createContext } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";

const DeleteUsers = () => {
  const navget = useNavigate();

  const { userID } = useParams();

  const data = {
    userID: userID,
  };
  console.log(data);
  const confirm = () => {
    if (data.userID === "") {
      return;
    }
    fetch("/back-end/deleteUsers.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log(res.json());
      navget("/dashboard");
    });
  };

  const goBack = () => {
    navget("/dashboard");
  };
  return (
    <div>
      <h1 className="sure__text">Are you sure you want to delete this User?</h1>
      <button className="back__user" onClick={goBack}>
        Go Back
      </button>
      <button className="del__user" onClick={confirm}>
        Delete
      </button>
    </div>
  );
};

export default DeleteUsers;
