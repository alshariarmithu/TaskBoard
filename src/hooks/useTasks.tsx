import { useState, useEffect } from "react";
import { Task, TaskStage } from "../types/Task";

const STORAGE_KEY = "taskboard-tasks";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);


  useEffect(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          updatedAt: new Date(task.updatedAt),
        }));
        setTasks(parsedTasks);
      } catch (error) {
        console.error("Error loading tasks from localStorage:", error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      title,
      description,
      stage: "assigned",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updates, updatedAt: new Date() } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const moveTask = (id: string, newStage: TaskStage) => {
    updateTask(id, { stage: newStage });
  };

  const getTasksByStage = (stage: TaskStage) => {
    return tasks.filter((task) => task.stage === stage);
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    getTasksByStage,
  };
}
