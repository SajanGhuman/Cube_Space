import { useContext, useEffect, useState } from "react";
import "../App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import ADD from "./add";
import Content from "./content";
import EDIT from "./edit";
import Search from "./search";

const UserDashboard = () => {
  const [show, setShow] = useState(true);
  const [id, setID] = useState(null);

  useEffect(() => {
    handleID();
  }, [id]);

  const handleID = () => {
    console.log("running");
  };

  const handleShow = (algID) => {
    setID(algID);
  };

  return (
    <div>
      <div className="add__main__div__1">
        <Link to="/ADD" className="add__div">
          <button className="add__text__1">Add a Algorithm</button>
        </Link>
        <br />
        <Link to="/addCategory" className="add__div">
          <p className="add__text__3">Add Category</p>
        </Link>
        <Link to="/manageCategory" className="add__div_1">
          <p className="add__text__3">Manage Category</p>
        </Link>
      </div>
      {show ? <Content handleShow={handleShow} /> : <EDIT />}
      {/* <Comments /> */}
    </div>
  );
};

export default UserDashboard;
