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
import { ResetButton } from './styles';
import { SoundPlayer } from '../../../../service/sound/SoundPlayer';

type TimerProps = {
  pomodoroTimer: PomodoroTimer;
  currentSeconds: number;
  currentTimerState: TimerState | 'initialized';
  palette: PomoPalette;
  soundPlayer: SoundPlayer;
};

const Timer = ({
  pomodoroTimer,
  currentSeconds,
  currentTimerState,
  palette,
  soundPlayer,
}: TimerProps) => {
  const isRunning = currentTimerState === 'running';

  const timeString = convertTimeValueToString(
    convertSecondsToTimeValue(currentSeconds)
  );

  const handleClick = () => {
    soundPlayer.playSound('click');
    if (currentTimerState === 'running') {
      pomodoroTimer.pauseTimer();
      return;
    }
    pomodoroTimer.startTimer();
  };

  return (
    <div className={styles.container}>
      <div className={styles.timer}>
        <ResetButton
          className={styles.resetButton}
          onClick={() => pomodoroTimer.resetTimer()}
          $hoverColor={palette.accent}
        >
          <FontAwesomeIcon icon={faRotateBack} />
        </ResetButton>
        <p className={styles.time}>{timeString}</p>
      </div>
      <button
        className={`${styles.controller} ${
          isRunning ? styles.running : undefined
        }`}
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
