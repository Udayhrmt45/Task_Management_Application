import { useAuth } from "../context/AuthContext";
import { useTask } from "../context/TaskContext";
import Navbar from "../components/Navbar/Navbar";
import StatsBar from "../components/StatsBar/StatsBar";
import SearchFilter from "../components/SearchFilter/SearchFilter";
import TaskCard from "../components/TaskCard/TaskCard";
import Pagination from "../components/Pagination/Pagination";
import "./HomePage.css";

const HomePage = () => {
  const { user } = useAuth();

  const { loading, error, getPaginatedTasks } = useTask();

  const { paginatedTasks } = getPaginatedTasks();

  if (loading) {
    return (
      <div className="home-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-page">
        <div className="error-container">
          <p>⚠️ {error}</p>
          <button
            className="retry-btn"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <div className="welcome-banner">
        <h2>
          Welcome, <span className="user-name">{user.name}</span> 👋
        </h2>
        <p>to Task Manager</p>
      </div>

      <StatsBar />

      <SearchFilter />

      <div className="task-grid">
        {paginatedTasks.length > 0 ? (
          paginatedTasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <div className="no-tasks">
            <p>No tasks found. Try a different search or filter.</p>
          </div>
        )}
      </div>

      <Pagination />
    </div>
  );
};

export default HomePage;
