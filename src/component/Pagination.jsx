import React, { useState, useEffect } from "react";
import "./Pagination.css";

const Pagination = () => {
  const [data, setData] = useState([]); // Data from API
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [itemsPerPage] = useState(5); // Number of items to show per page

  // Call the fetchData function once to get the data
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data from the fake API
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  // Get the current items to display based on current page
  const indexOfLastItem = currentPage * itemsPerPage; // Index of the last item calculated based on current page and items per page
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Index of the first item calculated based on last item and items per page
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem); // sliced out a limited length of data from full data to display in current page

  // Change/Update current page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Generate an array of page numbers from current page to previous two pages
  const previousPages = [];
  //Check for last pages , add extra previous page if needed
  if (currentPage === totalPages) {
    if (currentPage - 4 > 0) {
      previousPages.push(totalPages - 4);
    }
    if (currentPage - 3 > 1) {
      previousPages.push(totalPages - 3);
    }
  }
  if (currentPage === totalPages - 1) {
    if (currentPage - 4 > 0) {
      previousPages.push(totalPages - 4);
    }
  }
  // main previous pages array
  for (let i = Math.max(1, currentPage - 2); i < currentPage; i++) {
    previousPages.push(i);
  }

  // Generate an array of page numbers from current page to next two pages
  const nextPages = [];
  for (
    let i = currentPage + 1;
    i <= Math.min(currentPage + 2, totalPages);
    i++
  ) {
    nextPages.push(i);
  }
  if (currentPage === 1) {
    if (currentPage + 2 < totalPages) {
      nextPages.push(4);
    }
    if (currentPage + 3 < totalPages) {
      nextPages.push(5);
    }
  }
  if (currentPage === 2) {
    if (currentPage + 3 < totalPages) {
      nextPages.push(5);
    }
  }

  return (
    <div className="pagination-container">
      <h1>Pagination Example</h1>

      {/* display data */}
      <ul>
        {currentItems.map((item) => (
          <li key={item.id}>
            {item.id} : &nbsp;
            {item.title}
          </li>
        ))}
      </ul>

      {/* pagination bar */}
      <div className="pagination-buttons">
        {/* first page button  */}
        <button
          onClick={() => paginate(1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          &lt;&lt;
        </button>

        {/* previous page button  */}
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          &lt;
        </button>

        {/* previous buttons  */}
        {previousPages.map((page) => (
          <button
            key={page}
            onClick={() => paginate(page)}
            className="pagination-button"
          >
            {page}
          </button>
        ))}

        {/* Current page button  */}
        <button className="current-page">{currentPage}</button>

        {/* next page buttons  */}
        {nextPages.map((page) => (
          <button
            key={page}
            onClick={() => paginate(page)}
            className="pagination-button"
          >
            {page}
          </button>
        ))}

        {/* next page button  */}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          &gt;
        </button>

        {/* last page button  */}
        <button
          onClick={() => paginate(totalPages)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          &gt;&gt;
        </button>
      </div>

      <div>
        <p>
          Page {currentPage} of {totalPages}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
