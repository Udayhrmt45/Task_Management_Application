import { createContext, useState, useContext, useEffect } from "react";
import useFetchTasks from "../hooks/useFetchTasks";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { data: fetchedTasks, loading, error } = useFetchTasks();

  const [tasks, setTasks] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 9;

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const pageParam = parseInt(params.get("page"), 10);
      if (!isNaN(pageParam) && pageParam > 0) {
        setCurrentPage(pageParam);
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (fetchedTasks.length > 0) {
      setTasks(fetchedTasks);
    }
  }, [fetchedTasks]);

  const addTask = (newTask) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const updateTask = (taskId, updatedFields) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedFields } : task,
      ),
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const getNextId = () => {
    if (tasks.length === 0) return 1;
    const maxId = Math.max(...tasks.map((task) => task.id));
    return maxId + 1;
  };

  const getFilteredTasks = () => {
    let filtered = [...tasks];

    if (statusFilter !== "All") {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }

    if (searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.task.toLowerCase().includes(lowerSearch) ||
          task.assignedTo.toLowerCase().includes(lowerSearch),
      );
    }

    return filtered;
  };

  const getStats = () => {
    return {
      total: tasks.length,
      inProgress: tasks.filter((t) => t.status === "In Progress").length,
      completed: tasks.filter((t) => t.status === "Completed").length,
      onHold: tasks.filter((t) => t.status === "Hold").length,
    };
  };

  const getPaginatedTasks = () => {
    const filtered = getFilteredTasks();
    const totalFiltered = filtered.length;
    const totalPages = Math.ceil(totalFiltered / tasksPerPage);

    const startIndex = (currentPage - 1) * tasksPerPage;
    const endIndex = startIndex + tasksPerPage;
    const paginatedTasks = filtered.slice(startIndex, endIndex);

    return { paginatedTasks, totalPages, totalFiltered };
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const value = {
    tasks,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    tasksPerPage,
    addTask,
    updateTask,
    deleteTask,
    getNextId,
    getFilteredTasks,
    getStats,
    getPaginatedTasks,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTask = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }

  return context;
};

export default TaskContext;
