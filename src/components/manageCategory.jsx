import "../App.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManageCategory = () => {
  const [users, setUsers] = useState([]);
  const [currUserID, setCurrUserID] = useState(localStorage.getItem("userID"));

  useEffect(() => {
    fetch("/back-end/getCategories.php")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        if (data.error === true) {
          setError(data.result);
        } else {
          setUsers(data.result);
          console.log(data);
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, []);
  return (
    <div className="users__div">
      <table className="users__table">
        <thead>
          <tr>
            <th>Category ID</th>
            <th>Category Name</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((item) => (
              <tr key={item.categoryID}>
                <td>{item.categoryID}</td>
                <td>{item.categoryName}</td>
                {item.userID !== currUserID && (
                  <td>
                    <Link to={`/editCategory/${item.categoryID}`}>
                      <button className="edit__comment__button">Edit</button>
                    </Link>
                    <Link to={`/deleteCategory/${item.categoryID}`}>
                      <button className="del__comment__button">Delete</button>
                    </Link>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageCategory;
