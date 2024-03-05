import { useEffect, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import Content from "./content";
import EDIT from "./edit";

const AdminDashboard = () => {
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
        <Link to="/ADDUSER" className="add__div">
          <p className="add__text__2">Add a User</p>
        </Link>
        <Link to="/Users" className="add__div">
          <p className="add__text__3">Manage Users</p>
        </Link>
        <Link to="/addCategory" className="add__div">
          <p className="add__text__3">Add Category</p>
        </Link>
        <Link to="/manageCategory" className="add__div_1">
          <p className="add__text__3">Manage Category</p>
        </Link>
      </div>
      {show ? <Content handleShow={handleShow} /> : <EDIT />}
    </div>
  );
};

export default AdminDashboard;

{
  /* <div className="add__main__div__2">
  <Link to="/content" className="add__div">
    <p className="add__text">Show Database</p>
  </Link>
</div> */
}
