import { PomoPalette } from '../../../../service/pomodoro/pomoThemes';
import { SoundPlayer } from '../../../../service/sound/SoundPlayer';
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
  soundPlayer: SoundPlayer;
};
const PomoSettings = ({
  openSettings,
  pomodoroTotalMinutes,
  shortBreakTotalMinutes,
  longBreakTotalMinutes,
  isAutoStartEnabled,
  palette,
  soundPlayer,
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
      <SettingItem
        className={styles.setting}
        onClick={() => openSettings('volume')}
        $hoverColor={palette.accent}
      >
        <span className={styles.settingLabel}>Volume</span>
        <span className={styles.settingValue}>
          {soundPlayer.getVolume() * 100}%
        </span>
      </SettingItem>
    </ul>
  );
};

export default PomoSettings;
