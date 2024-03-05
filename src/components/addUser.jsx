import { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

const ADDUSER = () => {
  const navget = useNavigate();
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    password1: "",
    email: "",
    access: "",
  });

  const handleChange = (e, type) => {
    switch (type) {
      case "name":
        setError("");
        setFormData({ ...formData, name: e.target.value });
        console.log(formData);
        if (e.target.value === "") {
          setError("Name Is Empty");
        }
        break;
      case "password":
        setError("");
        setFormData({ ...formData, password: e.target.value });
        console.log(formData);
        if (e.target.value === "") {
          setError("password Is Empty");
        }
        break;
      case "password1":
        setError("");
        setFormData({ ...formData, password1: e.target.value });
        console.log(formData);
        if (e.target.value !== formData.password) {
          setError("Password did not match");
        }
        break;
      case "email":
        setError("");
        setFormData({ ...formData, email: e.target.value });
        console.log(formData);
        if (e.target.value === "") {
          setError("Email Is Empty");
        }
        break;
      case "access":
        setError("");
        setFormData({ ...formData, access: e.target.value });
        console.log(formData);
        if (e.target.value === "") {
          setError("Choose Acces Level");
        }
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name !== "" &&
      formData.password !== "" &&
      formData.password1 !== "" &&
      formData.email !== "" &&
      formData.access !== ""
    ) {
      fetch("/back-end/addUser.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
          if (res.error === true) {
            setError(res.result);
          } else {
            setMsg("User Added successfully!! Redirecting...");
            setTimeout(() => {
              navget("/");
            }, 3000);
          }
        })
        .catch((err) => {
          setError(err);
          console.log("Error:", err);
        });
    } else {
      e.preventDefault();
      setError("All field are required");
    }
  };

  return (
    <div className="user__div__main">
      <div className="msg__div">
        {msg !== "" ? (
          <span className="success">{msg}</span>
        ) : (
          <span className="error">{error}</span>
        )}
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <ul className="add__ul">
          <li>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter Name"
              onChange={(e) => handleChange(e, "name")}
            />
          </li>
          <li>
            <label htmlFor="email">email:</label>
            <input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              placeholder="Enter email"
              onChange={(e) => handleChange(e, "email")}
            />
          </li>
          <li>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              placeholder="Enter  password"
              onChange={(e) => handleChange(e, "password")}
            />
          </li>
          <li>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password1"
              id="password1"
              value={formData.password1}
              placeholder="Enter password Again"
              onChange={(e) => handleChange(e, "password1")}
            />
          </li>
          <li>
            <label htmlFor="access">Access Level:</label>
            <select
              value={formData.access}
              name="access"
              id="access"
              onChange={(e) => handleChange(e, "access")}
            >
              <option value="">Choose Access Level</option>
              <option value="1">Admin</option>
              <option value="0">User</option>
            </select>
          </li>

          <button type="submit" className="add__submit" disabled={msg !== ""}>
            Add User
          </button>
        </ul>
      </form>
    </div>
  );
};

export default ADDUSER;
