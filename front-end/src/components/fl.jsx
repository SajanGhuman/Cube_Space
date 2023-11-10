import "../App.css";
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

const FL = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost/react-project/back-end/show.php")
      .then((res) => res.json())
      .then((fetchedData) => {
        if (fetchedData && fetchedData.length !== 0) {
          setData(fetchedData);
          console.log("data is set");
        }
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <div>
      <table className="f2l__table alg__table">
        <thead className="table__header__f2l">
          <h1>F2l Algorithms</h1>
        </thead>
        <div className="tr__div">
          <tr>
            <th>Alg ID</th>
            <th>Name</th>
            <th>Notation</th>
            <th>Description</th>
          </tr>

          {data !== null ? (
            data.map((item) => (
              <tr>
                <th>{item.algID}</th>
                <td>{item.name}</td>
                <td>{item.notation}</td>
                <Link to="/edit" ><div><p>Edit</p></div></Link>
              </tr>
            ))
            ) : (
              <p>Loading data...</p>
              )}
              
        </div>
      </table>
    </div>
  );
};

export default FL;
