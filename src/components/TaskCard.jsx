import { useState } from "react";
import { useTask } from "../context/TaskContext";
import "./TaskCard.css";

const TaskCard = ({ task }) => {
  const { updateTask, deleteTask } = useTask();

  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    task: task.task,
    status: task.status,
    assignedTo: task.assignedTo,
  });

  const getStatusClass = (status) => {
    switch (status) {
      case "In Progress":
        return "in-progress";
      case "Completed":
        return "completed";
      case "Hold":
        return "hold";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateTask(task.id, {
      task: editData.task,
      status: editData.status,
      assignedTo: editData.assignedTo,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({
      task: task.task,
      status: task.status,
      assignedTo: task.assignedTo,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <div className="task-card">
        <span className="task-id">#{task.id}</span>

        <div className="edit-form">
          <div>
            <label>Task Name</label>
            <input
              type="text"
              name="task"
              value={editData.task}
              onChange={handleChange}
              placeholder="Enter task name"
            />
          </div>

          <div className="edit-row">
            <div>
              <label>Status</label>
              <select
                name="status"
                value={editData.status}
                onChange={handleChange}
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Hold">Hold</option>
              </select>
            </div>
            <div>
              <label>Assigned To</label>
              <input
                type="text"
                name="assignedTo"
                value={editData.assignedTo}
                onChange={handleChange}
                placeholder="Enter username"
              />
            </div>
          </div>

          <div className="edit-actions">
            <button className="btn-save" onClick={handleSave}>
              ✓ Save
            </button>
            <button className="btn-cancel" onClick={handleCancel}>
              ✕ Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="task-card">
      <span className="task-id">#{task.id}</span>

      <h3 className="task-name">{task.task}</h3>

      <div className="task-meta">
        <span className={`status-badge ${getStatusClass(task.status)}`}>
          {task.status}
        </span>
        <span className="task-assigned">
          👤 {task.assignedTo || "Unassigned"}
        </span>
      </div>

      <div className="task-actions">
        <button className="btn-edit" onClick={handleEdit}>
          ✏️ Edit
        </button>
        <button className="btn-delete" onClick={handleDelete}>
          🗑 Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
