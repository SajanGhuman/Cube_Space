import "../App.css";
import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

const Comments = ({ pageKey }) => {
  const [comments, setComments] = useState({
    userID: localStorage.getItem("userID"),
    name: "",
    content: "",
    pageKey: pageKey,
  });

  const [commentsSection, setCommentsSection] = useState([]);

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleText = (e) => {
    setComments({ ...comments, [e.target.name]: e.target.value });
    console.log(comments);
  };

  const isLoggedIn = localStorage.getItem("login");

  const submitComment = (e) => {
    e.preventDefault();

    if (comments.content.trim() !== "") {
      fetch("/../back-end/comments.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comments),
      })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((res) => {
          if (res.error === true) {
            console.log(res.result);
            setError(res.result);
          } else {
            setError("");
            console.log(res.result);
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    } else {
      e.preventDefault();
      setError("All fields are required");
    }
  };

  useEffect(() => {
    fetch(`/back-end/getComments.php?pageKey=${pageKey}`)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => {
        if (res.error === true) {
          console.log("there is an error");
        } else {
          setCommentsSection(res.result);
          console.log(res.result);
        }
      })
      .catch((err) => {
        setError(err);
        console.log("Error:", err);
      });
  }, []);

  return (
    <div className="comments__div__full">
      <div className="msg__div">
        {msg !== "" ? (
          <span className="comments__msg">{msg}</span>
        ) : (
          <span className="comments__error">{error}</span>
        )}
      </div>

      <div
        className={
          pageKey === 0 ? "comments__content__div" : "comments__content__div__1"
        }
      >
        <h1 className="leave__comment">Leave a Comment</h1>
        <div className="comments__title__all">
          <label htmlFor="comments__title">
            <h3>Your Name </h3>
          </label>
          <textarea
            className="comments__title"
            name="name"
            id="comments__title"
            value={comments.name}
            cols="30"
            rows="3"
            onChange={handleText}
          ></textarea>
          <textarea
            className="comments__content"
            name="content"
            id="comments__content"
            value={comments.content}
            cols="150"
            rows="10"
            onChange={handleText}
          ></textarea>
        </div>
        <button onClick={submitComment} className="comment__button">
          Comment
        </button>
      </div>
      <div className={"comment__section__1"}>
        {commentsSection.map((comment, index) => (
          <div className="user__comment__div" key={index}>
            <p>
              {isLoggedIn === "true" && comment.commentName === ""
                ? localStorage.getItem("name")
                : comment.commentName}
            </p>
            <p>{comment.content}</p>
            {localStorage.getItem("login") === "true" &&
              localStorage.getItem("access") === "1" && (
                <div>
                  <Link to={`/editComment/${comment.id}`}>
                    <button className="edit__comment__button">Edit</button>
                  </Link>
                  <Link to={`/deleteComment/${comment.id}`}>
                    <button className="del__comment__button">Delete</button>
                  </Link>
                </div>
              )}
          </div>
        ))}
      </div>
      <div className="filler__div"></div>
    </div>
  );
};

export default Comments;
