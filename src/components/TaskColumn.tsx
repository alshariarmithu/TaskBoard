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
    <div className="flex flex-col h-full">
      <div
        className={`${stage.bgColor} ${stage.borderColor} border-t-4 rounded-t-lg p-4`}
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold text-gray-800">{stage.title}</h2>
          <span
            className={`${stage.color} text-sm font-medium px-2 py-1 rounded-full`}
          >
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask(stage.id)}
          className="w-full flex items-center justify-center py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 transition-colors group"
        >
          <Plus className="w-4 h-4 mr-2" />
          <span className="text-sm">Add Task</span>
        </button>
      </div>

      <div
        className="flex-1 p-4 space-y-3 bg-gray-50 rounded-b-lg min-h-[400px]"
        onDrop={(e) => onDrop(e, stage.id)}
        onDragOver={onDragOver}
      >
        {tasks.map((task) => (
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
        ))}
        {tasks.length === 0 && (
          <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
            No tasks in this stage
          </div>
        )}
      </div>
    </div>
  );
}
