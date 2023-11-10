import { useEffect, useState } from "react";
import "../App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

const REGISTER = () => {
  const navget = useNavigate();
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pass1: "",
    pass2: "",
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
      case "email":
        setError("");
        setFormData({ ...formData, email: e.target.value });
        console.log(formData);
        if (e.target.value === "") {
          setError("Email Is Empty");
        }
        break;
      case "pass1":
        setError("");
        setFormData({ ...formData, pass1: e.target.value });
        console.log(formData);
        if (e.target.value === "") {
          setError("Password Is Empty");
        }
        break;
      case "pass2":
        setError("");
        setFormData({ ...formData, pass2: e.target.value });
        console.log(formData);
        if (e.target.value === "") {
          setError("Password Is Empty");
        } else if (e.target.value !== formData.pass1) {
          setError("Passwords Did Not Match!!");
        }
        break;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (
      formData.email !== "" &&
      formData.email !== "" &&
      formData.pass1 !== "" &&
      formData.pass2 !== "" &&
      formData.pass1 === formData.pass2
    ) {
      fetch("http://localhost/react-project/back-end/register.php", {
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
            setError("Match Not Found! Access Denied");
          } else {
            setMsg("Resgistered successfully!! Redirecting...");
            setTimeout(() => {
              localStorage.setItem("register", "true");
              navget("/login");
            }, 3000);
          }
        })
        .catch((err) => {
          setError(err);
          console.log("Error:", err);
        });
    } else {
      e.preventDefault();
      setError("All field are required and should be valid");
    }
  };
  return (
    <div className="login__div">
      {msg !== "" ? (
        <span className="success">{msg}</span>
      ) : (
        <span className="error">{error}</span>
      )}
      <form onSubmit={(e) => handleSubmit(e)}>
        <ul className="login__ul">
          <li>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter Your Name"
              onChange={(e) => handleChange(e, "name")}
            />
          </li>
          <li>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              placeholder="Enter Your Email"
              onChange={(e) => handleChange(e, "email")}
            />
          </li>
          <li>
            <label htmlFor="pass">Password:</label>
            <input
              type="password"
              name="pass1"
              id="pass1"
              value={formData.pass1}
              placeholder="Enter Your Password"
              onChange={(e) => handleChange(e, "pass1")}
            />
          </li>
          <li>
            <label htmlFor="pass">Password:</label>
            <input
              type="password"
              name="pass2"
              id="pass2"
              value={formData.pass2}
              placeholder="Enter Your Password Again!"
              onChange={(e) => handleChange(e, "pass2")}
            />
          </li>
          <button type="submit" className="login__submit">
            REGISTER
          </button>
        </ul>
      </form>
    </div>
  );
};

export default REGISTER;
