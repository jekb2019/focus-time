import { PomoPalette } from '../../../../service/pomodoro/pomoThemes';
import { SettingField } from '../../../../service/timer/types';
import styles from './PomoSettings.module.css';

type PomoSettingsProps = {
  openSettings: (field: SettingField) => void;
  pomodoroTotalMinutes: number;
  shortBreakTotalMinutes: number;
  longBreakTotalMinutes: number;
  isAutoStartEnabled: boolean;
  palette: PomoPalette;
};
const PomoSettings = ({
  openSettings,
  pomodoroTotalMinutes,
  shortBreakTotalMinutes,
  longBreakTotalMinutes,
  isAutoStartEnabled,
  palette,
}: PomoSettingsProps) => {
  return (
    <ul className={styles.settings}>
      <li className={styles.setting} onClick={() => openSettings('pomodoro')}>
        <span className={styles.settingLabel}>Focus</span>
        <span className={styles.settingValue}>{pomodoroTotalMinutes} mins</span>
      </li>
      <li
        className={styles.setting}
        onClick={() => openSettings('short-break')}
      >
        <span className={styles.settingLabel}>Short Break</span>
        <span className={styles.settingValue}>
          {shortBreakTotalMinutes} mins
        </span>
      </li>
      <li className={styles.setting} onClick={() => openSettings('long-break')}>
        <span className={styles.settingLabel}>Long Break</span>
        <span className={styles.settingValue}>
          {longBreakTotalMinutes} mins
        </span>
      </li>
      <li className={styles.setting} onClick={() => openSettings('auto-start')}>
        <span className={styles.settingLabel}>Auto Start</span>
        <span className={styles.settingValue}>
          {isAutoStartEnabled ? 'Yes' : 'No'}
        </span>
      </li>
    </ul>
  );
};

export default PomoSettings;
