import { useEffect, useState } from "react";
import "../App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

const Need = () => {
  return (
    <div className="need__div" >
      <h1 className="need__h1">
        You need to log in/register in order to access this page
      </h1>
      <Link to="/" ><button className="need__button">Go To Home Page</button></Link>
    </div>
  );
};

export default Need;
