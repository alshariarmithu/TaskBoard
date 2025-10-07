import React from "react";
import { Plus } from "lucide-react";
import { Task, TaskStage, TaskStageConfig } from "../types/Task";
import { TaskCard } from "./TaskCard";

interface TaskColumnProps {
  stage: TaskStageConfig;
  tasks: Task[];
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onDeleteTask: (id: string) => void;
  onAddTask: (stage: TaskStage) => void;
  onDrop: (e: React.DragEvent, stage: TaskStage) => void;
  onDragOver: (e: React.DragEvent) => void;
  draggedTaskId?: string;
}

export function TaskColumn({
  stage,
  tasks,
  onUpdateTask,
  onDeleteTask,
  onAddTask,
  onDrop,
  onDragOver,
  draggedTaskId,
}: TaskColumnProps) {
  return (
    <div
      className="flex flex-col h-full rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      {/* Column Header */}
      <div
        className={`px-6 py-4 border-b border-gray-200 flex items-center justify-between ${stage.bgColor}`}
      >
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
            {stage.title}
          </h2>
          <span className="px-2.5 py-0.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask(stage.id)}
          className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-150"
          aria-label={`Add task to ${stage.title}`}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Task List */}
      <div
        className="flex-1 p-4 space-y-3 bg-gray-50/30 min-h-[400px] overflow-y-auto"
        onDrop={(e) => onDrop(e, stage.id)}
        onDragOver={onDragOver}
      >
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdate={onUpdateTask}
              onDelete={onDeleteTask}
              isDragging={draggedTaskId === task.id}
              onDragStart={(e, taskId) => {
                e.dataTransfer.setData("text/plain", taskId);
              }}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-12">
            <div className="w-12 h-12 mb-3 rounded-full bg-gray-100 flex items-center justify-center">
              <Plus className="w-5 h-5 text-gray-400" />
            </div>
            <p className="text-sm text-gray-500">No tasks</p>
          </div>
        )}
      </div>

      {/* Mobile Add Task Button */}
      <div className="p-4 border-t border-gray-200 bg-white sm:hidden">
        <button
          onClick={() => onAddTask(stage.id)}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-150"
          aria-label={`Add task to ${stage.title}`}
        >
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>
    </div>
  );
}