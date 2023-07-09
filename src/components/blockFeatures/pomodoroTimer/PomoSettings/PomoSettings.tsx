import styles from './PomoSettings.module.css';

const PomoSettings = () => (
  <ul className={styles.settings}>
    <li className={styles.setting}>
      <span className={styles.settingLabel}>Focus</span>
      <span className={styles.settingValue}>40 mins</span>
    </li>
    <li className={styles.setting}>
      <span className={styles.settingLabel}>Short Break</span>
      <span className={styles.settingValue}>5 mins</span>
    </li>
    <li className={styles.setting}>
      <span className={styles.settingLabel}>Long Break</span>
      <span className={styles.settingValue}>30 mins</span>
    </li>
    <li className={styles.setting}>
      <span className={styles.settingLabel}>Auto Start</span>
      <span className={styles.settingValue}>Yes</span>
    </li>
  </ul>
);

export default PomoSettings;
