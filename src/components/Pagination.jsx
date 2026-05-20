import { useTask } from "../context/TaskContext";
import { useSearchParams } from "react-router-dom";
import "./Pagination.css";

const Pagination = () => {
  const { currentPage, setCurrentPage, getPaginatedTasks } = useTask();
  const { totalPages } = getPaginatedTasks();
  const [searchParams, setSearchParams] = useSearchParams();

  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      setSearchParams({ page: String(newPage) });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      setSearchParams({ page: String(newPage) });
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSearchParams({ page: String(pageNumber) });
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="pagination">
      <button
        className="page-btn"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        ← Prev
      </button>

      {getPageNumbers().map((pageNum) => (
        <button
          key={pageNum}
          className={`page-btn ${currentPage === pageNum ? "active" : ""}`}
          onClick={() => handlePageClick(pageNum)}
        >
          {pageNum}
        </button>
      ))}

      <button
        className="page-btn"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
