import { useEffect } from 'react';
import {
  DEFAULT_LONG_BREAK_MINUTES,
  DEFAULT_POMODORO_MINUTES,
  DEFAULT_SHORT_BREAK_MINUTES,
  PomodoroTimer,
  PomodoroTimerImpl,
} from '../../service/pomodoro/PomodoroTimer';
import Pomodoro from '../blockFeatures/pomodoroTimer/Pomodoro/Pomodoro';
import styles from './MainGrid.module.css';
import { getPomodoroTimerSettingsFromLocalStorage } from '../../service/localStorage/pomodoroLocalStorage';
import { ONE_MINUTE_IN_SECONDS } from '../../utils/time';

function initializePomodoroTimer() {
  const cachedSettings = getPomodoroTimerSettingsFromLocalStorage();
  const settings = cachedSettings
    ? cachedSettings
    : {
        pomodoro: DEFAULT_POMODORO_MINUTES * ONE_MINUTE_IN_SECONDS,
        shortBreak: DEFAULT_SHORT_BREAK_MINUTES * ONE_MINUTE_IN_SECONDS,
        longBreak: DEFAULT_LONG_BREAK_MINUTES * ONE_MINUTE_IN_SECONDS,
        autoStart: false,
      };

  const pomodoroTimer: PomodoroTimer = new PomodoroTimerImpl(settings);
  return pomodoroTimer;
}

const pomodoroTimer = initializePomodoroTimer();

const MainGrid = () => {
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <Pomodoro pomodoroTimer={pomodoroTimer} />
      </div>
      <div className={styles.column}></div>
    </div>
  );
};

export default MainGrid;
