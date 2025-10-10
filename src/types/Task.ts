export type TaskStage = "assigned" | "in-progress" | "in-review" | "completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  stage: TaskStage;
  createdAt: Date;
  updatedAt: Date;
  user: string;
}

export interface TaskStageConfig {
  id: TaskStage;
  title: string;
  color: string;
  bgColor: string;
  borderColor: string;
}
