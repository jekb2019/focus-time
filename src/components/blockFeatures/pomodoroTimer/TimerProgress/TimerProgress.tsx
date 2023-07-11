import styles from './TimerProgress.module.css';

type TimerProgressProps = {
  percentage: number;
};

const TimerProgress = ({ percentage }: TimerProgressProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div
          className={styles.fill}
          style={{
            width: `${percentage}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default TimerProgress;
