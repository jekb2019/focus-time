import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContentBox from '../../../ContentBox/ContentBox';
import styles from './TaskTracker.module.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TaskFilter from '../TaskFilter/TaskFilter';
import TaskBoard from '../TaskBoard/TaskBoard';

const TaskTracker = () => (
  <ContentBox
    title="Task Tracker"
    style={{
      backgroundColor: 'white',
      height: '100%',
    }}
    headerRight={
      <button className={styles.addTaskButton}>
        <FontAwesomeIcon icon={faPlus} />
        New Task
      </button>
    }
  >
    <div className={styles.container}>
      <TaskFilter />
      <TaskBoard />
    </div>
  </ContentBox>
);

export default TaskTracker;
