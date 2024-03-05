import "../App.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Comments from "./comments";

import React from "react";

const FullView = () => {
  const { algID } = useParams();
  const pageKey = algID;

  const data = {
    algID: algID,
  };
  const [sortedData, setSortedData] = useState([]);
  useEffect(() => {
    fetch("/back-end/algorithms1.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.error === true) {
          console.log("There is an error");
        } else {
          setSortedData(data.result[0]);
          console.log("Everything went good");
          console.log(data.result[0]);
          console.log(sortedData);
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, []);
  return (
    <div>
      {localStorage.getItem("access") === 1 ? (
        <button className="suggest__alg">Add algorithm</button>
      ) : localStorage.getItem("access") === 1 ? (
        <button className="suggest__alg">Suggest a algorithm</button>
      ) : (
         ""
      )}

      {sortedData.url && (
        <img
          className="full__image"
          src={`/f2l/${sortedData.url}`}
          alt="Image"
        />
      )}
      <div className="full__content">
        <p>{sortedData.name}</p>
      </div>
      <table className="full__table alg__table__full">
        <tr>
          <th>Date Added:</th>
          <th>Notation:</th>
          <th>Type:</th>
        </tr>
        <tr>
          <td>{sortedData.name}</td>
          <td>{sortedData.notation}</td>
          <td>{sortedData.type}</td>
        </tr>
      </table>
      <Comments pageKey={pageKey} />
    </div>
  );
};

export default FullView;
