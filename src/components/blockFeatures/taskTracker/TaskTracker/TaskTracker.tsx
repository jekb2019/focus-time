import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContentBox from '../../../ContentBox/ContentBox';
import styles from './TaskTracker.module.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const TaskTracker = () => (
  <ContentBox
    title="Task Tracker"
    style={{
      backgroundColor: 'white',
    }}
    headerRight={
      <button className={styles.addTaskButton}>
        <FontAwesomeIcon icon={faPlus} />
        New Task
      </button>
    }
  >
    <div className={styles.container}>
      <div className={styles.taskFilter}>
        <button className={`${styles.filter} ${styles.all} ${styles.active}`}>
          All
        </button>
        <button className={`${styles.filter}`}>Todo</button>
        <button className={`${styles.filter}`}>Done</button>
        <button className={`${styles.filter}`}>Archived</button>
      </div>
    </div>
  </ContentBox>
);

export default TaskTracker;
