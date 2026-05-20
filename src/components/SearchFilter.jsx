import { useTask } from "../context/TaskContext";
import "./SearchFilter.css";

const SearchFilter = () => {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    getPaginatedTasks,
    tasks,
  } = useTask();

  const { totalFiltered } = getPaginatedTasks();

  const filters = ["All", "In Progress", "Completed", "Hold"];

  const getActiveClass = (filter) => {
    if (statusFilter !== filter) return "";

    switch (filter) {
      case "All":
        return "active-all";
      case "In Progress":
        return "active-in-progress";
      case "Completed":
        return "active-completed";
      case "Hold":
        return "active-hold";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="search-filter">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search tasks or users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="search-input"
          />
        </div>

        <div className="filter-buttons">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-btn ${getActiveClass(filter)}`}
              onClick={() => setStatusFilter(filter)}
              id={`filter-${filter.toLowerCase().replace(" ", "-")}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <p className="showing-count">
        Showing {totalFiltered} of {tasks.length} tasks
      </p>
    </>
  );
};

export default SearchFilter;
