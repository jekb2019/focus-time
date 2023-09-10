import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContentBox from '../../../ContentBox/ContentBox';
import styles from './TaskManager.module.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TaskFilter from '../TaskFilter/TaskFilter';
import TaskBoard from '../TaskBoard/TaskBoard';
import { TaskTracker } from '../../../../service/taskTracker/TaskTracker';
import { useState } from 'react';

type TaskManagerProps = {
  taskTracker: TaskTracker;
};

const TaskManager = ({ taskTracker }: TaskManagerProps) => {
  const [tasks, setTasks] = useState(() => taskTracker.getAllTasks());
  const reorderTasks = (id: string, newIndex: number) => {
    taskTracker.reorderTask(id, newIndex);
  };

  const refreshTasks = () => {
    setTasks(taskTracker.getAllTasks());
  };

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
        <TaskBoard
          tasks={tasks}
          reorderTasks={reorderTasks}
          refreshTasks={refreshTasks}
        />
      </div>
    </ContentBox>
  );
};

export default TaskManager;
