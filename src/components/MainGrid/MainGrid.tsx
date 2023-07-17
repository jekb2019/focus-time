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
import {
  DEFAULT_VOLUME,
  SoundPlayer,
  SoundPlayerImpl,
} from '../../service/sound/SoundPlayer';
import { PomoConfig } from '../../service/pomodoro/types';
import { getVolumeSettingsFromLocalStorage } from '../../service/localStorage/volumeLocalStorage';
import TaskTracker from '../blockFeatures/taskTracker/TaskTracker/TaskTracker';

function initializePomodoroTimer(settings: PomoConfig) {
  const pomodoroTimer: PomodoroTimer = new PomodoroTimerImpl(settings);
  return pomodoroTimer;
}

function initializeSoundPlayer(volume: number) {
  const soundPlayer: SoundPlayer = new SoundPlayerImpl(volume);
  return soundPlayer;
}

function initialize() {
  const cachedPmodoroSettings = getPomodoroTimerSettingsFromLocalStorage();
  const pomodoroDefaultSettings: PomoConfig = {
    pomodoro: DEFAULT_POMODORO_MINUTES * ONE_MINUTE_IN_SECONDS,
    shortBreak: DEFAULT_SHORT_BREAK_MINUTES * ONE_MINUTE_IN_SECONDS,
    longBreak: DEFAULT_LONG_BREAK_MINUTES * ONE_MINUTE_IN_SECONDS,
    autoStart: false,
  };

  const pomodoroSetting = cachedPmodoroSettings
    ? cachedPmodoroSettings
    : pomodoroDefaultSettings;

  const pomodoroTimer = initializePomodoroTimer(pomodoroSetting);
  const cachedVolumeSettings = getVolumeSettingsFromLocalStorage();

  const volume = cachedVolumeSettings
    ? cachedVolumeSettings.volume
    : DEFAULT_VOLUME;
  const soundPlayer = initializeSoundPlayer(volume);

  return { pomodoroTimer, soundPlayer };
}

const { pomodoroTimer, soundPlayer } = initialize();

const MainGrid = () => {
  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <Pomodoro pomodoroTimer={pomodoroTimer} soundPlayer={soundPlayer} />
      </div>
      <div className={styles.column}>
        <TaskTracker />
      </div>
    </div>
  );
};

export default MainGrid;
