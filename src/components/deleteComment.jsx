import "../App.css";
import { useNavigate, useParams } from "react-router-dom";

const DeleteComments = () => {
  const navget = useNavigate();

  const { id } = useParams();

  const data = {
    id: id,
  };
  console.log(data);
  const confirm = () => {
    if (data.id === "") {
      return;
    }
    fetch("/back-end/deleteComment.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      navget("/dashboard");
    });
  };

  const goBack = () => {
    navget("/dashboard");
  };

  return (
    <div>
      <h1 className="sure__text">Are you sure you want to delete this row?</h1>
      <button className="back__comment" onClick={goBack}>
        Go Back
      </button>
      <button className="del__comment" onClick={confirm}>
        Delete
      </button>
    </div>
  );
};

export default DeleteComments;
