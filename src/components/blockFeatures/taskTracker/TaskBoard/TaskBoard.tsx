import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './TaskBoard.module.css';
import {
  faEllipsis,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons';
import { Checkbox } from '@mui/material';

const TaskBoard = () => (
  <div className={styles.container}>
    <div className={styles.ticket}>
      <button className={styles.seeMoreButton}>
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </button>
      <p className={styles.title}>Assignment one</p>
      <p className={styles.description}>Introduction to Science</p>
      <p className={styles.additionalInfo}>Completed at 26 June 11:30pm</p>
      <div className={styles.doneCheckBox}>
        <Checkbox
          checked={true}
          onChange={console.log}
          sx={{
            color: 'black',
            '&.Mui-checked': {
              color: 'black',
            },
          }}
        />
      </div>
    </div>
  </div>
);

export default TaskBoard;
