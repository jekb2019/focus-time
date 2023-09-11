import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContentBox from '../../../ContentBox/ContentBox';
import styles from './TaskManager.module.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TaskFilter from '../TaskFilter/TaskFilter';
import TaskBoard from '../TaskBoard/TaskBoard';
import { TaskTracker } from '../../../../service/taskTracker/TaskTracker';
import { useMemo, useState } from 'react';
import { TaskFilterOption } from '../../../../service/taskTracker/type';
import { filterTasks } from '../../../../service/taskTracker/utils';

type TaskManagerProps = {
  taskTracker: TaskTracker;
};

const TaskManager = ({ taskTracker }: TaskManagerProps) => {
  const [tasks, setTasks] = useState(() => taskTracker.getAllTasks());
  const [filter, setFilter] = useState<TaskFilterOption>('all');
  const reorderTasks = (id: string, newIndex: number) => {
    taskTracker.reorderTask(id, newIndex);
  };

  const refreshTasks = () => {
    setTasks(taskTracker.getAllTasks());
  };

  const setIsCopmlete = (taskId: string, isCompleted: boolean) => {
    taskTracker.setIsCompleted(taskId, isCompleted);
    refreshTasks();
  };

  const filteredTasks = useMemo(
    () => filterTasks(tasks, filter),
    [tasks, filter]
  );

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
        <button onClick={() => console.log(taskTracker.getAllTasks())}>
          DO
        </button>
        <TaskFilter tasks={tasks} setFilter={setFilter} filter={filter} />
        <TaskBoard
          tasks={filteredTasks}
          reorderTasks={reorderTasks}
          refreshTasks={refreshTasks}
          setIsCopmlete={setIsCopmlete}
        />
      </div>
    </ContentBox>
  );
};

export default TaskManager;
