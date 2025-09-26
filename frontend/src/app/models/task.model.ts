export enum TaskStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED'
}

export interface Task {
  id?: number;
  title: string;
  description?: string;
  status: TaskStatus;
}

export interface TaskRequest {
  title: string;
  description?: string;
  status?: TaskStatus;
}