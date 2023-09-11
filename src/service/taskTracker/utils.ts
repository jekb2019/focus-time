import { Task, TaskFilterOption } from './type';

export function getCurrentDateFieldValue() {
  return new Date().toISOString();
}

export function filterTasks(tasks: Task[], filter: TaskFilterOption): Task[] {
  const unarchinvedTasks = tasks.filter((task) => !task.isArchived);
  switch (filter) {
    case 'all':
      return unarchinvedTasks;
    case 'todo':
      return unarchinvedTasks.filter((task) => !task.isCompleted);
    case 'done':
      return unarchinvedTasks.filter((task) => task.isCompleted);
    case 'archived':
      return tasks.filter((task) => task.isArchived);
    default:
      throw new Error('unknown task filter');
  }
}

export function getTaskCount(tasks: Task[], filter: TaskFilterOption): number {
  const filteredTasks = filterTasks(tasks, filter);
  return filteredTasks.length;
}
