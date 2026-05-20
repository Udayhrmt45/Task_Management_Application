import { useTask } from "../context/TaskContext";
import "./StatsBar.css";

const StatsBar = () => {
  const { getStats } = useTask();
  const stats = getStats();

  return (
    <div className="stats-bar">
      <div className="stat-card total">
        <div className="stat-number">{stats.total}</div>
        <div className="stat-label">Total Tasks</div>
      </div>

      <div className="stat-card in-progress">
        <div className="stat-number">{stats.inProgress}</div>
        <div className="stat-label">In Progress</div>
      </div>

      <div className="stat-card completed">
        <div className="stat-number">{stats.completed}</div>
        <div className="stat-label">Completed</div>
      </div>

      <div className="stat-card on-hold">
        <div className="stat-number">{stats.onHold}</div>
        <div className="stat-label">On Hold</div>
      </div>
    </div>
  );
};

export default StatsBar;
