import React, { useState } from "react";
import { CreditCard as Edit2, Trash2, GripVertical } from "lucide-react";
import { Task } from "../types/Task";

interface TaskCardProps {
  task: Task;
  onUpdate: (id: string, updates: Partial<Task>) => void;
  onDelete: (id: string) => void;
  isDragging?: boolean;
  onDragStart?: (e: React.DragEvent, taskId: string) => void;
}

export function TaskCard({
  task,
  onUpdate,
  onDelete,
  isDragging,
  onDragStart,
}: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(task.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 space-y-3">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="w-full text-sm font-medium border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onKeyDown={handleKeyPress}
          autoFocus
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="w-full text-sm text-gray-600 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
          onKeyDown={handleKeyPress}
          placeholder="Task description..."
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleCancel}
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-sm border border-gray-200 group hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing ${
        isDragging ? "opacity-50 rotate-2" : ""
      }`}
      draggable
      onDragStart={(e) => onDragStart?.(e, task.id)}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-900 flex-1 pr-2 line-clamp-2">
          {task.title}
        </h3>
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical className="w-4 h-4 text-gray-400" />
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
            title="Edit task"
          >
            <Edit2 className="w-3 h-3" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
            title="Delete task"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
      {task.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
          {task.description}
        </p>
      )}
      <div className="text-xs text-gray-400">
        Created {task.createdAt.toLocaleDateString()}
      </div>
    </div>
  );
}
