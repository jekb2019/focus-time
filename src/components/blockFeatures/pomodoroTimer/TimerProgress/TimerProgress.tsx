import styles from './TimerProgress.module.css';

const percentage = 65;

const TimerProgress = () => (
  <div className={styles.container}>
    <div className={styles.bar}>
      <div
        className={styles.fill}
        style={{
          width: '50%',
        }}
      ></div>
    </div>
  </div>
);

export default TimerProgress;
