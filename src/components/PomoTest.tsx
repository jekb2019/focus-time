import { useEffect, useState } from 'react';
import {
  PomodoroTimer,
  PomodoroTimerImpl,
} from '../service/pomodoro/PomodoroTimer';
import styles from './PomoTest.module.css';
import { PomoState } from '../service/pomodoro/types';

const pomodoro = 5;
const shortBreak = 2;
const longBreak = 3;

const pomoTimer: PomodoroTimer = new PomodoroTimerImpl({
  pomodoro,
  shortBreak,
  longBreak,
  autoStart: false,
  eventHandler: console.log,
});

const PomoTest = () => {
  const [seconds, setSeconds] = useState(
    () => pomoTimer.getInfo().currentSeconds
  );
  const [state, setState] = useState(() => pomoTimer.getInfo().currentState);
  const [autoStart, setAutoStart] = useState(
    () => pomoTimer.getInfo().autoStart
  );
  const [info, setInfo] = useState(() => {
    const { pomodoro, shortBreak, longBreak } = pomoTimer.getInfo();
    return { pomodoro, shortBreak, longBreak };
  });
  const [pomodoroInput, setPomodoroInput] = useState(pomodoro);
  const [shortBreakInput, setShortBreakInput] = useState(shortBreak);
  const [longBreakInput, setLongBreakInput] = useState(longBreak);

  useEffect(() => {
    pomoTimer.setEventHandler((event) => {
      console.log(event);
      const { currentSeconds, currentState, pomodoro, shortBreak, longBreak } =
        event.timerInfo;
      setSeconds(currentSeconds);
      setState(currentState);
      setInfo({ pomodoro, shortBreak, longBreak });
    });
  }, []);

  useEffect(() => {
    pomoTimer.setAutoStart(autoStart);
  }, [autoStart]);

  const handleStateButtonClick = (state: PomoState) => {
    pomoTimer.changePomoState(state);
  };

  const handleTimeValueUpdate = (state: PomoState) => {
    switch (state) {
      case 'pomodoro':
        console.log('setting pomodoro to ', pomodoroInput);
        break;
      case 'short-break':
        console.log('setting short break to ', shortBreakInput);
        break;
      case 'long-break':
        console.log('setting long break to ', longBreakInput);
        break;
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.label}>Pomodoro Timer</h1>
      <div className={styles['timer-info']}>
        <div className={styles['timer-value']}>
          <span>Pomodoro: {info.pomodoro}</span>
          <div className={styles['seconds-setter']}>
            <input
              value={pomodoroInput}
              onChange={(e) => setPomodoroInput(Number(e.target.value))}
              type="number"
            />
            <button onClick={() => handleTimeValueUpdate('pomodoro')}>
              Set
            </button>
          </div>
        </div>
        <div className={styles['timer-value']}>
          <span>Short Break: {info.shortBreak}</span>
          <div className={styles['seconds-setter']}>
            <input
              value={shortBreakInput}
              onChange={(e) => setShortBreakInput(Number(e.target.value))}
              type="number"
            />
            <button onClick={() => handleTimeValueUpdate('short-break')}>
              Set
            </button>
          </div>
        </div>
        <div className={styles['timer-value']}>
          <span>Long Break: {info.longBreak}</span>
          <div className={styles['seconds-setter']}>
            <input
              value={longBreakInput}
              onChange={(e) => setLongBreakInput(Number(e.target.value))}
              type="number"
            />
            <button onClick={() => handleTimeValueUpdate('long-break')}>
              Set
            </button>
          </div>
        </div>
      </div>
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

      <div className={styles.operations}>
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
      </div>

      <div className={styles['auto-start']}>
        <label htmlFor="auto-start">Auto Start</label>
        <input
          id="auto-start"
          type="checkbox"
          checked={autoStart}
          onChange={(e) => setAutoStart(e.target.checked)}
        />
      </div>
      <h1>{seconds}</h1>
    </div>
  );
};

export default PomoTest;
