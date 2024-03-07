import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "./pagination";
import "react-quill/dist/quill.snow.css";

const Content = () => {
  /*--------------------Pagination Logic--------------------*/
  const [sortedData, setSortedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(4);
  const [paginatedData, setPaginatedData] = useState([]);
  const pageKey = 0;
  useEffect(() => {
    const lastPageIndex = currentPage * postPerPage;
    const firstPageIndex = lastPageIndex - postPerPage;
    setPaginatedData(sortedData.slice(firstPageIndex, lastPageIndex));
  }, [sortedData, currentPage, postPerPage]);

  const [searchValue, setSearchValue] = useState("");
  const navget = useNavigate();
  const [algID, setID] = useState({
    algID: null,
  });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [sort, setSort] = useState({
    selected: "name",
    type: "",
    search: "",
    searchBy: "name",
  });
  const [searchData, setSearchData] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleSearch = (e) => {
    setSort({ ...sort, search: e.target.value });
    setSearchValue(e.target.value);
  };

  const handleChange = (e) => {
    setSort({ ...sort, searchBy: e.target.value });
    console.log(sort);
  };

  const handleOptionsChange = (e) => {
    console.log(e.target.value);
    setSort({ ...sort, type: e.target.value });
    console.log(sort);
  };

  const handleClick = (kid) => {
    setID({ ...algID, algID: kid });
  };

  const handleSort = (e) => {
    setSort({ ...sort, selected: e.target.value });
    console.log(sort);
  };

  const handleClear = () => {
    setSort({ ...sort, selected: "", type: "", search: "", searchBy: "name" });
    setSearchValue("");
  };
  useEffect(() => {
    fetch("/back-end/algorithms.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sort),
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        if (data.error) {
          console.log("Error:", data.error);
          setSortedData([]);
        } else {
          setSortedData(data.result || []);
        }
      })
      .catch((err) => {
        console.log("Catch Error:", err);
        setSortedData([]);
      });
  }, [sort]);

  useEffect(() => {
    {
      fetch(`/back-end/getCategories.php`)
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((res) => {
          console.log(res);
          if (res.error === true) {
            setError("Error occured");
          } else {
            console.log(res.result);
            setCategories(res.result || []);
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    }
  }, []);

  return (
    <div>
      <div className="msg__div">
        {msg !== "" ? (
          <span className="comments__msg">{msg}</span>
        ) : (
          <span className="comments__error">{error}</span>
        )}
      </div>
      <div className="sort__div__main">
        <div>
          <select
            value={sort.type}
            onChange={handleOptionsChange}
            className="type__options"
          >
            <option value="">All</option>
            {categories.map((category) => (
              <option value={category.categoryName}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </div>
        <div className="sort__div">
          <select
            name="sort"
            id="sort"
            value={sort.selected}
            onChange={handleSort}
          >
            <option name="name" value="name">
              Name(A-Z)
            </option>
            <option value="date">Date Created(newest first)</option>
            <option name="modified" value="modified">
              Date Modified(newest first)
            </option>
          </select>

          <button className="sort__remove__button" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>
      <div className="content__div">
        {localStorage.getItem("login") === "true" ? (
          <div>
            <div className="search__container__main">
              <div className="search__div">
                <input
                  type="text"
                  onChange={handleSearch}
                  value={searchValue}
                />
              </div>
              <div className="searchBy__div">
                <label htmlFor="access">Search By</label>
                <select
                  value={sort.searchBy}
                  onChange={handleChange}
                  name="searchBy"
                  id="searchBy"
                >
                  <option value="name">Name</option>
                  <option value="notation">Notation</option>
                </select>
              </div>
            </div>
            {sortedData.length > 0 ? (
              <div>
                <table
                  className={
                    sort.type === "oll"
                      ? "oll__table"
                      : sort.type === "pll"
                      ? "pll__table"
                      : sort.type === "f2l"
                      ? "f2l__table"
                      : "alg__table"
                  }
                >
                  <thead>
                    <tr>
                      <th>AlgID</th>
                      <th>Case</th>
                      <th>Name</th>
                      <th>Notation</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody className="table__body">
                    {sortedData.length > 0 &&
                      paginatedData.map((item) => (
                        <tr key={item.algID}>
                          <td
                            className="sorted_td"
                            onClick={() => navget(`/fullView/${item.algID}`)}
                          >
                            {item.algID}
                          </td>
                          <td
                            className="sorted_td"
                            onClick={() => navget(`/fullView/${item.algID}`)}
                          >
                            {item.url !== "" ? (
                              <img
                                className="content__image"
                                src={`/f2l/${encodeURIComponent(item.url)}`}
                              />
                            ) : (
                              ""
                            )}
                          </td>
                          <td
                            className="sorted_td"
                            onClick={() => navget(`/fullView/${item.algID}`)}
                          >
                            {item.name}
                          </td>
                          <td
                            className="sorted_td"
                            onClick={() => navget(`/fullView/${item.algID}`)}
                          >
                            {item.notation}
                          </td>
                          <td>{item.type}</td>
                          <td>
                            <Link to={`/edit/${item.algID}`}>
                              <button
                                className="content__edit__button"
                                onClick={() => {
                                  handleClick(item.algID);
                                }}
                              >
                                Edit
                              </button>
                            </Link>
                          </td>
                          <td>
                            <Link to={`/delete/${item.algID}`}>
                              <button className="content__delete__button">
                                Delete
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <Pagination
                  totalPost={sortedData.length}
                  postPerPage={postPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </div>
            ) : (
              <div>
                <table
                  className={
                    sort.type === "oll"
                      ? "oll__table"
                      : sort.type === "pll"
                      ? "pll__table"
                      : sort.type === "f2l"
                      ? "f2l__table"
                      : "alg__table"
                  }
                >
                  <thead>
                    <tr>
                      <th>AlgID</th>
                      <th>Case</th>
                      <th>Name</th>
                      <th>Notation</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody className="table__body">
                    {sortedData.length > 0 &&
                      paginatedData.map((item) => (
                        <tr key={item.algID}>
                          <td
                            className="sorted_td"
                            onClick={() => navget(`/fullView/${item.algID}`)}
                          >
                            {item.algID}
                          </td>
                          <td
                            className="sorted_td"
                            onClick={() => navget(`/fullView/${item.algID}`)}
                          >
                            {item.url !== "" ? (
                              <img
                                className="content__image"
                                src={`/f2l/${encodeURIComponent(item.url)}`}
                              />
                            ) : (
                              ""
                            )}
                          </td>
                          <td
                            className="sorted_td"
                            onClick={() => navget(`/fullView/${item.algID}`)}
                          >
                            {item.name}
                          </td>
                          <td
                            className="sorted_td"
                            onClick={() => navget(`/fullView/${item.algID}`)}
                          >
                            {item.notation}
                          </td>
                          <td>{item.type}</td>
                          <td>
                            <Link to={`/edit/${item.algID}`}>
                              <button
                                className="content__edit__button"
                                onClick={() => {
                                  handleClick(item.algID);
                                }}
                              >
                                Edit
                              </button>
                            </Link>
                          </td>
                          <td>
                            <Link to={`/delete/${item.algID}`}>
                              <button className="content__delete__button">
                                Delete
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <Pagination
                  totalPost={sortedData.length}
                  postPerPage={postPerPage}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="search__container">
              <div className="search__container__main">
                <div className="search__div">
                  <input
                    type="text"
                    onChange={handleSearch}
                    value={searchValue}
                  />
                </div>
                <div className="searchBy__div">
                  <label htmlFor="access">Search By </label>
                  <select
                    value={sort.searchBy}
                    onChange={handleChange}
                    name="searchBy"
                    id="searchBy"
                  >
                    <option value="name">Name</option>
                    <option value="notation">Notation</option>
                  </select>
                </div>
              </div>
            </div>
            {sortedData.length > 0 ? (
              <div className="content__container__2">
                <table
                  className={
                    sort.type === "oll"
                      ? "oll__table"
                      : sort.type === "pll"
                      ? "pll__table"
                      : sort.type === "f2l"
                      ? "f2l__table"
                      : "alg__table"
                  }
                >
                  <thead>
                    <tr>
                      <th>AlgID</th>
                      <th>Name</th>
                      <th>Notation</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody className="table__body">
                    {sortedData.length > 0 &&
                      paginatedData.map((item) => (
                        <tr key={item.algID}>
                          <td
                            className="sorted_td"
                            onClick={() => navget(`/fullView/${item.algID}`)}
                          >
                            {item.algID}
                          </td>
                          <td
                            className="sorted_td"
                            onClick={() => navget(`/fullView/${item.algID}`)}
                          >
                            {item.url !== "" ? (
                              <img
                                className="content__image"
                                src={`/f2l/${encodeURIComponent(item.url)}`}
                              />
                            ) : (
                              ""
                            )}
                          </td>
                          <td
                            className="sorted_td"
                            onClick={() => navget(`/fullView/${item.algID}`)}
                          >
                            {item.name}
                          </td>
                          <td
                            className="sorted_td"
                            onClick={() => navget(`/fullView/${item.algID}`)}
                          >
                            {item.notation}
                          </td>
                          <td>{item.type}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="no__result">
                <div>
                  <table
                    className={
                      sort.type === "oll"
                        ? "oll__table"
                        : sort.type === "pll"
                        ? "pll__table"
                        : sort.type === "f2l"
                        ? "f2l__table"
                        : "alg__table"
                    }
                  >
                    <thead>
                      <tr>
                        <th>AlgID</th>
                        <th>Case</th>
                        <th>Name</th>
                        <th>Notation</th>
                        <th>Type</th>
                      </tr>
                    </thead>
                    <tbody className="table__body">
                      <tr>
                        <td className="sorted__td">1</td>
                        <td className="sorted__td">
                          <img src="/f2l/generator1.svg" alt="" />
                        </td>
                        <td className="sorted__td">F2l 1</td>
                        <td className="sorted__td">R' F R F'</td>
                        <td>F2l</td>
                      </tr>
                      <tr>
                        <td className="sorted__td">1</td>
                        <td className="sorted__td">
                          <img src="/f2l/generator1.svg" alt="" />
                        </td>
                        <td className="sorted__td">F2l 1</td>
                        <td className="sorted__td">U' R U R' U R U R'</td>
                        <td>F2l</td>
                      </tr>
                      <tr>
                        <td className="sorted__td">1</td>
                        <td className="sorted__td">
                          <img src="/f2l/generator1.svg" alt="" />
                        </td>
                        <td className="sorted__td">F2l 1</td>
                        <td className="sorted__td">U' R U2 R' U F' U' F</td>
                        <td>F2l</td>
                      </tr>
                      <tr>
                        <td className="sorted__td">1</td>
                        <td className="sorted__td">
                          <img src="/f2l/generator1.svg" alt="" />
                        </td>
                        <td className="sorted__td">F2l 1</td>
                        <td className="sorted__td">U' R U2 R' U F' U' F</td>
                        <td>F2l</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {/* <Pagination
              totalPost={sortedData.length}
              postPerPage={postPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            /> */}
          </div>
        )}
      </div>
      {/* <Comments pageKey={pageKey} /> */}
    </div>
  );
};

export default Content;
