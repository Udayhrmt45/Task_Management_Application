import { useState, useEffect } from "react";
import { fetchTasks } from "../services/taskService";

const useFetchTasks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadTasks();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const rawTasks = await fetchTasks();

      const transformedTasks = rawTasks.map((item) => ({
        id: item.id,
        task: item.title,
        status: item.completed ? "Completed" : "In Progress",
        assignedTo: "",
      }));

      setData(transformedTasks);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error };
};

export default useFetchTasks;
