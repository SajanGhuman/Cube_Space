import "../App.css";
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

const Content = () => {
  return (
    <div>
      <div class="content__div">
        <Link to="/fl">
          <div className="f2l__div alg__div">F2l Algorithms</div>
        </Link>
        <Link to="/oll">
          <div className="oll__div alg__div">OLL Algorithms</div>
        </Link>
        <Link to="/pll">
          <div className="pll__div alg__div">PLL Algorithms</div>
        </Link>
      </div>
    </div>
  );
};

export default Content;
