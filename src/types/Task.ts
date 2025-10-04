export interface Task {
  id: string;
  title: string;
  description: string;
  stage: TaskStage;
  createdAt: Date;
  updatedAt: Date;
}

export type TaskStage = "assigned" | "in-progress" | "in-review" | "completed";

export interface TaskStageConfig {
  id: TaskStage;
  title: string;
  color: string;
  bgColor: string;
  borderColor: string;
}
