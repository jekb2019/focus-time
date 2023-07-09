import ContentBox from '../../../ContentBox/ContentBox';
import FlowTracker from '../FlowTracker/FlowTracker';
import Timer from '../Timer/Timer';
import TimerProgress from '../TimerProgress/TimerProgress';
import styles from './Pomodoro.module.css';

const Pomodoro = () => (
  <ContentBox
    title="Pomodoro Timer"
    style={{
      backgroundColor: '#FFC3AB',
    }}
  >
    <div className={styles.container}>
      <FlowTracker />
      <Timer />
      <TimerProgress />
    </div>
  </ContentBox>
);

export default Pomodoro;
