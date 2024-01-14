import { useEffect, useState, useContext, createContext } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

const Search = () => {
  const [search, setSearch] = useState({
    search: "",
    searchBy: "name",
  });

  const [searchData, setSearchData] = useState([]);

  const handleSearch = (e) => {
    setSearch({ ...search, search: e.target.value });
    console.log(search);
  };

  const handleChange = (e) => {
    setSearch({ ...search, searchBy: e.target.value });
    console.log(search);
  };

  useEffect(() => {
    fetch("http://localhost/back-end/search.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(search),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((res) => {
        console.log(res);
        if (res.error === true) {
          console.log("Match Not Found! Access Denied");
        } else {
          console.log("search done !!!");
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, [search]);
  return (
    <div className="search__container">
      <div className="search__div">
        <input type="text" onChange={handleSearch} placeholder="Search" />
      </div>
      <div className="searchBy__div">
        <label htmlFor="access">Search By:</label>
        <select
          value={search.searchBy}
          onChange={handleChange}
          name="searchBy"
          id="searchBy"
        >
          <option value="name">Name</option>
          <option value="notation">Notation</option>
        </select>
      </div>
    </div>
  );
};

export default Search;
