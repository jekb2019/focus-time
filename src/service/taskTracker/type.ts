export type Task = {
  id: string;
  name: string;
  description: string;
  isCompleted: boolean;
  isArchived: boolean;
  createdAt: string;
  completedAt: string;
  updatedAt: string;
};

export type TaskFilterOption = 'all' | 'todo' | 'done' | 'archived';
