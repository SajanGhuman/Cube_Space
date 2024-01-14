import "../App.css";
import { useEffect, useState, useContext, createContext } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";

const EditCategory = () => {
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const { categoryID } = useParams();

  const [formData, setFormData] = useState({
    id: categoryID,
    categoryID: "",
    categoryName: "",
  });

  const navget = useNavigate();

  console.log(formData.id);
  const handleChange = (e, type) => {
    switch (type) {
      case "id":
        setError("");
        setFormData({ ...formData, categoryID: e.target.value });
        console.log(formData);
        if (e.target.value === "") {
          setError("ID Is Empty");
        }
        break;
      case "name":
        setError("");
        setFormData({ ...formData, categoryName: e.target.value });
        console.log(formData);
        if (e.target.value === "") {
          setError("Name Is Empty");
        }
        break;
    }
  };

  useEffect(() => {
    if (categoryID !== "") {
      fetch(
        `/back-end/getCategory.php?categoryID=${categoryID}`
      )
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((res) => {
          console.log(res);
          if (res.error === true) {
            setError("Error occured");
          } else {
            setFormData({
              ...formData,
              categoryID: res.result[0].categoryID || "",
              categoryName: res.result[0].categoryName || "",
            });
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    }
  }, [categoryID]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.categoryID !== "") {
      fetch("/back-end/editCategory.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((res) => {
          console.log(res);
          if (res.error === true) {
            setError("Could not update user!!Try again");
          } else {
            setMsg("Category Updated Successfully!! Redirecting...");
            setTimeout(() => {
              navget("/dashboard");
            }, 3000);
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    } else {
      e.preventDefault();
      setError("All field are required");
    }
  };

  return (
    <div className="comment__div__main">
      <div className="msg__div">
        {msg !== "" ? (
          <span className="edit__comment__msg">{msg}</span>
        ) : (
          <span className="edit__comment__error">{error}</span>
        )}
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <ul className="comment__ul">
          <li>
            <label htmlFor="id">Category ID:</label>
            <input
              type="text"
              name="id"
              value={formData.categoryID}
              placeholder="Enter ID"
              onChange={(e) => handleChange(e, "id")}
            />
          </li>
          <li>
            <label htmlFor="name">Category Name:</label>
            <input
              type="text"
              name="name"
              value={formData.categoryName}
              placeholder="Enter Name"
              onChange={(e) => handleChange(e, "name")}
            />
          </li>
          <button type="submit" className="add__submit" disabled={msg !== ""}>
            Update Comment
          </button>
        </ul>
      </form>
    </div>
  );
};

export default EditCategory;
