const API_URL = "https://jsonplaceholder.typicode.com/todos";

export const fetchTasks = async () => {
  try {
    const response = await fetch(`${API_URL}?_limit=20`);

    if (!response.ok) {
      throw new Error(`Failed to fetch tasks. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(
      error.message || "Something went wrong while fetching tasks",
    );
  }
};
