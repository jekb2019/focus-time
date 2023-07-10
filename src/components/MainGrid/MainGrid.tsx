import Pomodoro from '../blockFeatures/pomodoroTimer/Pomodoro/Pomodoro';
import styles from './MainGrid.module.css';

const MainGrid = () => (
  <div className={styles.container}>
    <div className={styles.column}>
      <Pomodoro />
    </div>
    <div className={styles.column}></div>
  </div>
);

export default MainGrid;
