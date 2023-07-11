import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Timer.module.css';
import {
  faPause,
  faPlay,
  faRotateBack,
} from '@fortawesome/free-solid-svg-icons';
import { PomodoroTimer } from '../../../../service/pomodoro/PomodoroTimer';
import {
  convertSecondsToTimeValue,
  convertTimeValueToString,
} from '../../../../utils/time';
import { TimerState } from '../../../../service/timer/types';

type TimerProps = {
  pomodoroTimer: PomodoroTimer;
  currentSeconds: number;
  currentTimerState: TimerState | 'initialized';
};

const Timer = ({
  pomodoroTimer,
  currentSeconds,
  currentTimerState,
}: TimerProps) => {
  const isRunning = currentTimerState === 'running';

  const timeString = convertTimeValueToString(
    convertSecondsToTimeValue(currentSeconds)
  );

  const handleClick = () => {
    if (currentTimerState === 'running') {
      pomodoroTimer.pauseTimer();
      return;
    }
    pomodoroTimer.startTimer();
  };

  return (
    <div className={styles.container}>
      <div className={styles.timer}>
        <button
          className={styles.resetButton}
          onClick={() => pomodoroTimer.resetTimer()}
        >
          <FontAwesomeIcon icon={faRotateBack} />
        </button>
        <p className={styles.time}>{timeString}</p>
      </div>
      <button className={styles.controller} onClick={handleClick}>
        {isRunning ? (
          <FontAwesomeIcon icon={faPause} />
        ) : (
          <FontAwesomeIcon icon={faPlay} />
        )}
      </button>
    </div>
  );
};

export default Timer;
