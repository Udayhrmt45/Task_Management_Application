import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTask } from "../context/TaskContext";
import { validateTask } from "../utils/validators";
import "./AddTaskPage.css";

const AddTaskPage = () => {
  const navigate = useNavigate();
  const { addTask, getNextId } = useTask();

  const nextId = getNextId();

  const [formData, setFormData] = useState({
    task: "",
    status: "In Progress",
    assignedTo: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateTask(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newTask = {
      id: nextId,
      task: formData.task.trim(),
      status: formData.status,
      assignedTo: formData.assignedTo.trim(),
    };

    addTask(newTask);

    navigate("/home");
  };

  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <div className="add-task-page">
      <div className="add-task-header">
        <h1>Add New Task</h1>
        <p>Fill in the details to create a new task</p>
      </div>

      <div className="add-task-card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="task">
              Task Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="task"
              name="task"
              placeholder="Describe the task..."
              value={formData.task}
              onChange={handleChange}
              className={errors.task ? "input-error" : ""}
            />
            {errors.task && <p className="error-message">{errors.task}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="status">
              Status <span className="required">*</span>
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Hold">Hold</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="assignedTo">
              Assign To <span className="required">*</span>
            </label>
            <input
              type="text"
              id="assignedTo"
              name="assignedTo"
              placeholder="Enter team member's name"
              value={formData.assignedTo}
              onChange={handleChange}
              className={errors.assignedTo ? "input-error" : ""}
            />
            {errors.assignedTo && (
              <p className="error-message">{errors.assignedTo}</p>
            )}
          </div>

          <div className="task-id-preview">
            Task ID will be: <span className="id-value">#{nextId}</span>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-add-task" id="add-task-button">
              + Add Task
            </button>
            <button
              type="button"
              className="btn-form-cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskPage;
