import { Task, TaskFilterOption } from '../../../../service/taskTracker/type';
import { getTaskCount } from '../../../../service/taskTracker/utils';
import styles from './TaskFilter.module.css';

type TaskFilterProps = {
  tasks: Task[];
  setFilter: (filter: TaskFilterOption) => void;
  filter: TaskFilterOption;
};

const TaskFilter = ({ tasks, setFilter, filter }: TaskFilterProps) => (
  <div className={styles.taskFilter}>
    <button
      className={`${styles.filter} ${styles.all} ${
        filter === 'all' ? styles.active : undefined
      }`}
      onClick={() => setFilter('all')}
    >
      All
      <span className={styles.count}>{getTaskCount(tasks, 'all')}</span>
    </button>
    <button
      className={`${styles.filter} ${
        filter === 'todo' ? styles.active : undefined
      }`}
      onClick={() => setFilter('todo')}
    >
      Todo
      <span className={styles.count}>{getTaskCount(tasks, 'todo')}</span>
    </button>
    <button
      className={`${styles.filter} ${
        filter === 'done' ? styles.active : undefined
      }`}
      onClick={() => setFilter('done')}
    >
      Done<span className={styles.count}>{getTaskCount(tasks, 'done')}</span>
    </button>
    <button
      className={`${styles.filter} ${
        filter === 'archived' ? styles.active : undefined
      }`}
      onClick={() => setFilter('archived')}
    >
      Archived
    </button>
  </div>
);

export default TaskFilter;
