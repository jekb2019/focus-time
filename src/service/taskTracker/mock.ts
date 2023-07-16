import { nanoid } from 'nanoid';
import { getCurrentDateFieldValue } from './utils';
import { Task } from './type';

export const tasks: Task[] = [
  {
    id: nanoid(),
    name: 'Task 1',
    description: 'This is the first example task',
    isCompleted: false,
    isArchived: false,
    createdAt: getCurrentDateFieldValue(),
    completedAt: getCurrentDateFieldValue(),
    updatedAt: getCurrentDateFieldValue(),
  },
  {
    id: nanoid(),
    name: 'Task 2',
    description: 'This is the second example task',
    isCompleted: true,
    isArchived: false,
    createdAt: getCurrentDateFieldValue(),
    completedAt: getCurrentDateFieldValue(),
    updatedAt: getCurrentDateFieldValue(),
  },
];
