import "../App.css";
import { useEffect, useState, useContext, createContext } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";

const DeleteCategory = () => {
  const navget = useNavigate();

  const { categoryID } = useParams();

  const data = {
    id: categoryID,
  };
  console.log(data);
  const confirm = () => {
    if (data.id === "") {
      return;
    }
    fetch("/back-end/deleteCategory.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      navget("/dashboard");
    });
  };

  const goBack = () => {
    navget("/dashboard");
  };

  return (
    <div>
      <h1 className="sure__text">
        Are you sure you want to delete this Category?
      </h1>
      <button className="back__comment" onClick={goBack}>
        Go Back
      </button>
      <button className="del__comment" onClick={confirm}>
        Delete
      </button>
    </div>
  );
};

export default DeleteCategory;
