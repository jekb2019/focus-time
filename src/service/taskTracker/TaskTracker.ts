import { nanoid } from 'nanoid';
import { Task } from './type';
import { getCurrentDateFieldValue } from './utils';
import { tasks as mockTasks } from './mock';

export interface TaskTracker {
  getAllTasks(): Task[];
  createTask(name: string, description: string): Task;
  updateName(id: string, name: string): Task[];
  updateDescription(id: string, description: string): Task[];
  setIsCompleted(id: string, isCompleted: boolean): Task[];
  setIsArchived(id: string, isArchived: boolean): Task[];
  deleteTask(id: string): Task[];
}

export class TaskTrackerImpl implements TaskTracker {
  constructor(createWithExampleTasks: boolean) {
    if (createWithExampleTasks) {
      this.tasks = mockTasks;
    }
  }

  private tasks: Task[] = [];

  private updateTaskField<T>(id: string, fieldName: string, value: T) {
    const updatedTasks = this.tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          [fieldName]: value,
        };
      }
      return task;
    });
    this.tasks = updatedTasks;
  }

  getAllTasks() {
    return this.tasks;
  }

  createTask(name: string, description: string) {
    if (!name) {
      throw new Error('A task must have a name');
    }

    const newTask: Task = {
      id: nanoid(),
      name,
      description,
      isCompleted: false,
      isArchived: false,
      createdAt: getCurrentDateFieldValue(),
      completedAt: getCurrentDateFieldValue(),
      updatedAt: getCurrentDateFieldValue(),
    };
    this.tasks = [newTask, ...this.tasks];
    return newTask;
  }

  updateName(id: string, name: string) {
    if (!name) {
      throw new Error('A task must have a name');
    }
    this.updateTaskField(id, 'name', name);
    return this.tasks;
  }

  updateDescription(id: string, description: string) {
    this.updateTaskField(id, 'description', description);
    return this.tasks;
  }

  setIsCompleted(id: string, isCompleted: boolean) {
    this.updateTaskField(id, 'isCompleted', isCompleted);
    return this.tasks;
  }

  setIsArchived(id: string, isArchived: boolean) {
    this.updateTaskField(id, 'isArchived', isArchived);
    return this.tasks;
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return this.tasks;
  }
}
