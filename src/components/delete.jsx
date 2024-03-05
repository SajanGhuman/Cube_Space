import "../App.css";
import { useNavigate, useParams } from "react-router-dom";

const Delete = () => {
  const navget = useNavigate();

  const { algID } = useParams();

  const data = {
    algID: algID,
  };
  console.log(data);
  const confirm = () => {
    if (data.algID === "") {
      return;
    }
    fetch("/back-end/delete.php", {
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
        <h1 className="sure__text" >Are you sure you want to delete this row?</h1>
      <button className="back__alg" onClick={goBack}>Go Back</button>
      <button className="del__alg" onClick={confirm}>
        Delete
      </button>
    </div>
  );
};

export default Delete;
