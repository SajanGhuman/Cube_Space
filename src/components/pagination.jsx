import React from "react";

const Pagination = ({
  totalPost,
  postPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="pagination__div">
      {localStorage.getItem("Login") === "true" ? (
        <div>
          <button
            onClick={() => {
              if (currentPage !== 1) setCurrentPage(1);
            }}
          >
            {"<<<"}
          </button>
          <button
            onClick={() => {
              if (currentPage !== 1) setCurrentPage(currentPage - 1);
            }}
          >
            {"Prev"}
          </button>
          {pages.map((page, index) => {
            return (
              <button
                className={currentPage - 1 === index ? "active__paginate" : ""}
                key={index}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => {
              if (currentPage !== Math.ceil(totalPost / postPerPage))
                setCurrentPage(currentPage + 1);
            }}
          >
            {"Next"}
          </button>
          <button
            onClick={() => {
              if (currentPage !== Math.ceil(totalPost / postPerPage))
                setCurrentPage(Math.ceil(totalPost / postPerPage));
            }}
          >
            {">>>"}
          </button>
        </div>
      ) : (
        <div className="pagination__out">
          <button
            onClick={() => {
              if (currentPage !== 1) setCurrentPage(1);
            }}
          >
            {"<<<"}
          </button>
          <button
            onClick={() => {
              if (currentPage !== 1) setCurrentPage(currentPage - 1);
            }}
          >
            {"Prev"}
          </button>
          {pages.map((page, index) => {
            return (
              <button
                className={currentPage - 1 === index ? "active__paginate" : ""}
                key={index}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => {
              if (currentPage !== Math.ceil(totalPost / postPerPage))
                setCurrentPage(currentPage + 1);
            }}
          >
            {"Next"}
          </button>
          <button
            onClick={() => {
              if (currentPage !== Math.ceil(totalPost / postPerPage))
                setCurrentPage(Math.ceil(totalPost / postPerPage));
            }}
          >
            {">>>"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
