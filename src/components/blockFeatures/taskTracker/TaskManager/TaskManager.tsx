import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContentBox from '../../../ContentBox/ContentBox';
import styles from './TaskManager.module.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TaskFilter from '../TaskFilter/TaskFilter';
import TaskBoard from '../TaskBoard/TaskBoard';
import { TaskTracker } from '../../../../service/taskTracker/TaskTracker';

type TaskManagerProps = {
  taskTracker: TaskTracker;
};

const TaskManager = ({ taskTracker }: TaskManagerProps) => {
  const tasks = taskTracker.getAllTasks();

  return (
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
        <TaskBoard tasks={tasks} />
      </div>
    </ContentBox>
  );
};

export default TaskManager;
