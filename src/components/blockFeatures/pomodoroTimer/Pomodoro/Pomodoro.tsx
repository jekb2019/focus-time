import ContentBox from '../../../ContentBox/ContentBox';
import FlowTracker from '../FlowTracker/FlowTracker';
import PomoSettings from '../PomoSettings/PomoSettings';
import Timer from '../Timer/Timer';
import TimerProgress from '../TimerProgress/TimerProgress';
import styles from './Pomodoro.module.css';

const Pomodoro = () => (
  <>
    <ContentBox
      title="Pomodoro Timer"
      style={{
        backgroundColor: '#FFC3AB',
      }}
    >
      <div className={styles.pomoContainer}>
        <FlowTracker />
        <Timer />
        <TimerProgress />
      </div>
    </ContentBox>
    <ContentBox
      title="Settings"
      style={{
        backgroundColor: '#FFC3AB',
      }}
    >
      <div className={styles.settingContainer}>
        <PomoSettings />
      </div>
    </ContentBox>
  </>
);

export default Pomodoro;
