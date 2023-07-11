import {
  PomodoroTimer,
  PomodoroTimerImpl,
} from '../../service/pomodoro/PomodoroTimer';
import Pomodoro from '../blockFeatures/pomodoroTimer/Pomodoro/Pomodoro';
import styles from './MainGrid.module.css';

const pomodoro = 60 * 25;
const shortBreak = 60 * 5;
const longBreak = 60 * 15;

const pomodoroTimer: PomodoroTimer = new PomodoroTimerImpl({
  pomodoro,
  shortBreak,
  longBreak,
  autoStart: false,
});

const MainGrid = () => (
  <div className={styles.container}>
    <div className={styles.column}>
      <Pomodoro pomodoroTimer={pomodoroTimer} />
    </div>
    <div className={styles.column}></div>
  </div>
);

export default MainGrid;
