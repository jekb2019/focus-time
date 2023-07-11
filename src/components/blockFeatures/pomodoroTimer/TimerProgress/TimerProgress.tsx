import { PomoPalette } from '../../../../service/pomodoro/pomoThemes';
import styles from './TimerProgress.module.css';

type TimerProgressProps = {
  percentage: number;
  palette: PomoPalette;
};

const TimerProgress = ({ percentage, palette }: TimerProgressProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <div
          className={styles.fill}
          style={{
            width: `${percentage}%`,
            backgroundColor: palette.accent,
          }}
        ></div>
      </div>
    </div>
  );
};

export default TimerProgress;
