"use client";
import React, { useState } from "react";
import { Header } from "../../components/Header";
import { TaskColumn } from "../../components/TaskColumn";
import { AddTaskModal } from "../../components/AddTaskModal";
import { useTasks } from "../../hooks/useTasks";
import { TaskStage, TaskStageConfig } from "../../types/Task";
import { Sidebar } from "../../components/Sidebar";

const taskStages: TaskStageConfig[] = [
  {
    id: "assigned",
    title: "Assigned",
    color: "text-blue-700 bg-blue-100",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-500",
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "text-orange-700 bg-orange-100",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-500",
  },
  {
    id: "in-review",
    title: "In Review",
    color: "text-purple-700 bg-purple-100",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-500",
  },
  {
    id: "completed",
    title: "Completed",
    color: "text-green-700 bg-green-100",
    bgColor: "bg-green-50",
    borderColor: "border-green-500",
  },
];

function App() {
  const [currentPage, setCurrentPage] = useState("projects");

  const { tasks, addTask, updateTask, deleteTask, moveTask, getTasksByStage } =
    useTasks();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStage, setSelectedStage] = useState<TaskStage>("assigned");
  const [draggedTaskId, setDraggedTaskId] = useState<string>();

  const filteredTasks = (stage: TaskStage) => {
    const stageTasks = getTasksByStage(stage);
    if (!searchQuery.trim()) return stageTasks;

    return stageTasks.filter(
      (task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleAddTask = (stage: TaskStage) => {
    setSelectedStage(stage);
    setShowAddModal(true);
  };

  const handleModalAddTask = (title: string, description: string) => {
    addTask(title, description);
    if (selectedStage !== "assigned") {
      setTimeout(() => {
        const newTask = tasks.find(
          (t) => t.title === title && t.description === description
        );
        if (newTask) {
          moveTask(newTask.id, selectedStage);
        }
      }, 0);
    }
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("text/plain", taskId);
    setDraggedTaskId(taskId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStage: TaskStage) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    if (taskId) {
      moveTask(taskId, targetStage);
    }
    setDraggedTaskId(undefined);
  };

  const handleDragEnd = () => {
    setDraggedTaskId(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar onNavigate={setCurrentPage} />

      <div className="flex-1 ml-20 transition-all duration-300">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {taskStages.map((stage) => (
              <TaskColumn
                key={stage.id}
                stage={stage}
                tasks={filteredTasks(stage.id)}
                onUpdateTask={updateTask}
                onDeleteTask={deleteTask}
                onAddTask={handleAddTask}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                draggedTaskId={draggedTaskId}
              />
            ))}
          </div>
        </main>
      </div>

      <AddTaskModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleModalAddTask}
      />
    </div>
  );
}

export default App;
