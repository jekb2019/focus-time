import { PomoPalette } from '../../../../service/pomodoro/pomoThemes';
import { SettingField } from '../../../../service/timer/types';
import styles from './PomoSettings.module.css';
import { SettingItem } from './styles';

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
      <SettingItem
        className={styles.setting}
        onClick={() => openSettings('pomodoro')}
        $hoverColor={palette.accent}
      >
        <span className={styles.settingLabel}>Focus</span>
        <span className={styles.settingValue}>{pomodoroTotalMinutes} mins</span>
      </SettingItem>
      <SettingItem
        className={styles.setting}
        onClick={() => openSettings('short-break')}
        $hoverColor={palette.accent}
      >
        <span className={styles.settingLabel}>Short Break</span>
        <span className={styles.settingValue}>
          {shortBreakTotalMinutes} mins
        </span>
      </SettingItem>
      <SettingItem
        className={styles.setting}
        onClick={() => openSettings('long-break')}
        $hoverColor={palette.accent}
      >
        <span className={styles.settingLabel}>Long Break</span>
        <span className={styles.settingValue}>
          {longBreakTotalMinutes} mins
        </span>
      </SettingItem>
      <SettingItem
        className={styles.setting}
        onClick={() => openSettings('auto-start')}
        $hoverColor={palette.accent}
      >
        <span className={styles.settingLabel}>Auto Start</span>
        <span className={styles.settingValue}>
          {isAutoStartEnabled ? 'Yes' : 'No'}
        </span>
      </SettingItem>
    </ul>
  );
};

export default PomoSettings;
