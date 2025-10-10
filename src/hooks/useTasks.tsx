import { useState, useEffect } from "react";
import { Task, TaskStage } from "../types/Task";

const API_URL = "http://localhost:5555/api/tasks";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Load tasks from backend
  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
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

  useEffect(() => {
    fetchTasks();
  }, []);

  // 🔹 Add task
  const addTask = async (title: string, description: string) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
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
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // 🔹 Move task between columns
  const moveTask = async (id: string, newStage: TaskStage) => {
    await updateTask(id, { stage: newStage });
  };

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
