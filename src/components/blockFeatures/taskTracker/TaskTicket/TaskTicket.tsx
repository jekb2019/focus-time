import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './TaskTicket.module.css';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Checkbox } from '@mui/material';
import { Task } from '../../../../service/taskTracker/type';

type TaskTicketProps = {
  task: Task;
  setIsCopmlete: (taskId: string, isCompleted: boolean) => void;
};

const TaskTicket = ({ task, setIsCopmlete }: TaskTicketProps) => {
  const isCompleted = task.isCompleted;
  return (
    <div
      className={`${styles.ticket} ${
        isCompleted ? styles.completed : undefined
      }`}
    >
      <button className={styles.seeMoreButton}>
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </button>
      <p className={`${styles.title}  `}>{task.name}</p>
      <p className={styles.description}>{task.description}</p>
      <p className={styles.additionalInfo}>Completed at {task.completedAt}</p>
      <div className={styles.doneCheckBox}>
        <Checkbox
          checked={isCompleted}
          onChange={(e) => setIsCopmlete(task.id, e.target.checked)}
          sx={{
            color: 'black',
            '&.Mui-checked': {
              color: 'black',
            },
          }}
        />
      </div>
    </div>
  );
};

export default TaskTicket;
