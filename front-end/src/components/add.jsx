import { useEffect, useState } from "react";
import "../App.css";
import { Routes, Route, Link } from "react-router-dom";

const ADD = () => {
  return (
    <div class="content__div">
      <Link to="/addfl">
        <div className="f2l__div alg__div">Add F2l Algorithms</div>
      </Link>
      <Link to="/addoll">
        <div className="oll__div alg__div">Add OLL Algorithms</div>
      </Link>
      <Link to="/addpll">
        <div className="pll__div alg__div">Add PLL Algorithms</div>
      </Link>
    </div>
  );
};

export default ADD;
