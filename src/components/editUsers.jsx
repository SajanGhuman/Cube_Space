import "../App.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditUsers = () => {
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const { userID } = useParams();

  const [formData, setFormData] = useState({
    userID: userID,
    name: "",
    email: "",
    access: "",
  });

  const navget = useNavigate();

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
      case "access":
        setError("");
        setFormData({ ...formData, access: e.target.value });
        console.log(formData);
        if (e.target.value === "") {
          setError("Choose an access Level");
        }
        break;
    }
  };

  useEffect(() => {
    if (userID !== "") {
      fetch(
        `/back-end/getUser.php?userID=${userID}`
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
              name: res.result[0].name || "",
              email: res.result[0].email || "",
              access: res.result[0].access || "",
            });
            console.log(res.result[0].name);
            console.log(res.result[0].email);
            console.log(res.result[0].access);
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    }
  }, [userID]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.userID !== "") {
      fetch("/back-end/updateUser.php", {
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
            setMsg("User updated successfully!! Redirecting...");
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

  const goBack = () => {
    navget("/dashboard");
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
            <label htmlFor="access">Access Level:</label>
            <select
              value={formData.access}
              name="access"
              id="access"
              onChange={(e) => handleChange(e, "access")}
            >
              <option value="0">User</option>
              <option value="1">Admin</option>
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

export default EditUsers;
