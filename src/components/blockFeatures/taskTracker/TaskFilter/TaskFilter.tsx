import styles from './TaskFilter.module.css';

const TaskFilter = () => (
  <div className={styles.taskFilter}>
    <button className={`${styles.filter} ${styles.all} ${styles.active}`}>
      All
      <span className={styles.count}>12</span>
    </button>
    <button className={`${styles.filter}`}>
      Todo
      <span className={styles.count}>5</span>
    </button>
    <button className={`${styles.filter}`}>
      Done<span className={styles.count}>7</span>
    </button>
    <button className={`${styles.filter}`}>Archived</button>
  </div>
);

export default TaskFilter;
