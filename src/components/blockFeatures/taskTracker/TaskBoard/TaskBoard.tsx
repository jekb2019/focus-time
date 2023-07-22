import styles from './TaskBoard.module.css';
import TaskTicket from '../TaskTicket/TaskTicket';
import { Task } from '../../../../service/taskTracker/type';

type TaskBoardProps = {
  tasks: Task[];
};

const TaskBoard = ({ tasks }: TaskBoardProps) => {
  return (
    <div className={styles.container}>
      {tasks.map((task) => (
        <TaskTicket key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskBoard;
