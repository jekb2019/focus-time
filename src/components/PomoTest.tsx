import { useEffect, useState } from 'react';
import {
  PomoState,
  PomodoroTimerImpl,
} from '../service/pomodoro/PomodoroTimer';
import styles from './PomoTest.module.css';

const pomodoro = 5;
const shortBreak = 2;
const longBreak = 3;

const pomoTimer = new PomodoroTimerImpl({
  pomodoro,
  shortBreak,
  longBreak,
  autoStart: false,
});

const PomoTest = () => {
  const [seconds, setSeconds] = useState(
    () => pomoTimer.getInfo().currentSeconds
  );
  const [state, setState] = useState(() => pomoTimer.getInfo().currentState);

  useEffect(() => {
    pomoTimer.setEventHandler((event) => {
      const { currentSeconds, currentState } = event.timerInfo;
      setSeconds(currentSeconds);
      setState(currentState);
    });
  }, []);

  const handleStateButtonClick = (state: PomoState) => {
    pomoTimer.changePomoState(state);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.label}>Pomo Test</h1>
      <div className={styles.states}>
        <button
          className={state === 'pomodoro' ? styles['state-active'] : undefined}
          onClick={() => handleStateButtonClick('pomodoro')}
        >
          Pomodoro
        </button>
        <button
          className={
            state === 'short-break' ? styles['state-active'] : undefined
          }
          onClick={() => handleStateButtonClick('short-break')}
        >
          Short Break
        </button>
        <button
          className={
            state === 'long-break' ? styles['state-active'] : undefined
          }
          onClick={() => handleStateButtonClick('long-break')}
        >
          Long Break
        </button>
      </div>

      <button
        onClick={() => {
          pomoTimer.startTimer();
        }}
      >
        Start
      </button>
      <button
        onClick={() => {
          pomoTimer.pauseTimer();
        }}
      >
        Pause
      </button>
      <button onClick={() => pomoTimer.resetTimer()}>Reset</button>
      <button onClick={() => console.log(pomoTimer.getInfo())}>Info</button>
      <br />
      <label>
        Auto Start
        <input
          type="checkbox"
          onChange={(e) => {
            const shouldAutoStart = e.target.checked;
            pomoTimer.setAutoStart(shouldAutoStart);
          }}
        />
      </label>
      <h1>{seconds}</h1>
    </div>
  );
};

export default PomoTest;
