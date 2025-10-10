import { useState, useEffect } from "react";
import { Task, TaskStage } from "../types/Task";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  // 🔹 Load token from localStorage (browser only)
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      setLoading(false); // No token, stop loading
    }
  }, []);

  // 🔹 Fetch tasks when token is available
  useEffect(() => {
    const fetchTasks = async () => {
      if (!token) return;

      try {
        const res = await fetch(`${API_URL}/tasks`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errData = await res.json();
          console.error("Unexpected response:", errData);
          return;
        }

        const data = await res.json();
        setTasks(
          data.map((task: any) => ({
            ...task,
            createdAt: new Date(task.createdAt),
            updatedAt: new Date(task.updatedAt),
          }))
        );
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

  // 🔹 Helper to include Authorization header
  const getAuthHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  });

  // 🔹 Add task
  const addTask = async (title: string, description: string) => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ title, description }),
      });
      const newTask = await res.json();
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // 🔹 Update task
  const updateTask = async (id: string, updates: Partial<Task>) => {
    if (!token) return;
    try {
      const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(updates),
      });
      const updated = await res.json();
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, ...updated } : task))
      );
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // 🔹 Delete task
  const deleteTask = async (id: string) => {
    if (!token) return;
    try {
      await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // 🔹 Move task between columns
  const moveTask = async (id: string, newStage: TaskStage) => {
    await updateTask(id, { stage: newStage });
  };

  // 🔹 Get tasks by stage
  const getTasksByStage = (stage: TaskStage) =>
    tasks.filter((task) => task.stage === stage);

  return {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    getTasksByStage,
  };
}
