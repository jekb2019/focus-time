import { SettingField } from '../../../../service/timer/types';
import styles from './PomoSettings.module.css';

type PomoSettingsProps = {
  openSettings: (field: SettingField) => void;
};
const PomoSettings = ({ openSettings }: PomoSettingsProps) => (
  <ul className={styles.settings}>
    <li className={styles.setting} onClick={() => openSettings('pomodoro')}>
      <span className={styles.settingLabel}>Focus</span>
      <span className={styles.settingValue}>40 mins</span>
    </li>
    <li className={styles.setting} onClick={() => openSettings('short-break')}>
      <span className={styles.settingLabel}>Short Break</span>
      <span className={styles.settingValue}>5 mins</span>
    </li>
    <li className={styles.setting} onClick={() => openSettings('long-break')}>
      <span className={styles.settingLabel}>Long Break</span>
      <span className={styles.settingValue}>30 mins</span>
    </li>
    <li className={styles.setting} onClick={() => openSettings('auto-start')}>
      <span className={styles.settingLabel}>Auto Start</span>
      <span className={styles.settingValue}>Yes</span>
    </li>
  </ul>
);

export default PomoSettings;
