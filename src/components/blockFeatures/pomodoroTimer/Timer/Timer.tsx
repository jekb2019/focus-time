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
import { PomoPalette } from '../../../../service/pomodoro/pomoThemes';

type TimerProps = {
  pomodoroTimer: PomodoroTimer;
  currentSeconds: number;
  currentTimerState: TimerState | 'initialized';
  palette: PomoPalette;
};

const Timer = ({
  pomodoroTimer,
  currentSeconds,
  currentTimerState,
  palette,
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
      <button
        className={styles.controller}
        onClick={handleClick}
        style={{
          backgroundColor: palette.accent,
        }}
      >
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
