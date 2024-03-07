import { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

const LOGIN = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navget = useNavigate();
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = (e, type) => {
    switch (type) {
      case "email":
        setError("");
        setFormData({ ...formData, email: e.target.value });
        console.log(formData);
        if (e.target.value === "") {
          setError("UserName is empty");
        }
        break;
      case "pass":
        setError("");
        setFormData({ ...formData, password: e.target.value });
        console.log(formData);
        if (e.target.value === "") {
          setError("Password is empty");
        }
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email !== "" && formData.password !== "") {
      fetch("/back-end/login.php", {
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
        .then((data) => {
          console.log(data);
          if (data[0].error === true) {
            setError(data[0].result);
          } else {
            setMsg("Logged in successfully!! Redirecting...");
            localStorage.setItem("login", true);
            localStorage.setItem("userID", data.userID);
            localStorage.setItem("name", data.name);
            localStorage.setItem("email", data.email);
            localStorage.setItem("access", data.access);
            console.log(data.name);
            console.log(data.userID);
            console.log(data.access);
            console.log(data.result);
            console.log(data.error);
            data.access === 1 &&
              localStorage.setItem("access", data.access) &&
              console.log("access is now 1");
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
      setError("All field are required!");
    }
  };

  return (
    <div className="login__div">
      {error !== "" ? (
        <div className="error__div__login">
          <p>{error}</p>
        </div>
      ) : (
        <div className="msg__div__login">{msg}</div>
      )}
      <form>
        <ul className="login__ul">
          <p>WELCOME TO CUBE SPACE</p>
          <p>LOGIN</p>
          <li>
            {/* <label htmlFor="email">Email:</label> */}
            <input
              type="text"
              name="email"
              id="email"
              value={formData.email}
              placeholder="Email"
              onChange={(e) => handleChange(e, "email")}
            />
          </li>
          <li>
            {/* <label htmlFor="password">Password:</label> */}
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              placeholder="Password"
              onChange={(e) => handleChange(e, "pass")}
            />
          </li>
          <button
            type="submit"
            onClick={handleSubmit}
            className="login__submit"
          >
            Login
          </button>
        </ul>
      </form>
    </div>
  );
};

export default LOGIN;
