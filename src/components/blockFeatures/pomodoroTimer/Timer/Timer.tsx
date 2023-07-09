import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Timer.module.css';
import { faPlay, faRotateBack } from '@fortawesome/free-solid-svg-icons';

const Timer = () => (
  <div className={styles.container}>
    <div className={styles.timer}>
      <button className={styles.resetButton}>
        <FontAwesomeIcon icon={faRotateBack} />
      </button>
      <p className={styles.time}>35:20</p>
    </div>
    <button className={styles.controller}>
      <FontAwesomeIcon icon={faPlay} />
    </button>
  </div>
);

export default Timer;
