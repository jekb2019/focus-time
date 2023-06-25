import { useEffect, useMemo, useState } from 'react';
import {
  PomodoroTimer,
  PomodoroTimerImpl,
} from '../service/pomodoro/PomodoroTimer';
import styles from './PomoTest.module.css';
import { PomoState } from '../service/pomodoro/types';
import {
  convertSecondsToTimeValue,
  convertTimeValueToString,
} from '../utils/time';

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
  const [state, setState] = useState(
    () => pomoTimer.getInfo().currentPomoState
  );
  const [autoStart, setAutoStart] = useState(
    () => pomoTimer.getInfo().autoStart
  );
  const [info, setInfo] = useState(() => {
    const { pomodoro, shortBreak, longBreak } = pomoTimer.getInfo();
    return { pomodoro, shortBreak, longBreak };
  });
  const [timerState, setTimterState] = useState(() => {
    const { currentTimerState } = pomoTimer.getInfo();
    return currentTimerState;
  });

  const [pomoFlowInfo, setPomoFlowInfo] = useState(() => {
    const { pomoFlowInfo } = pomoTimer.getInfo();
    return pomoFlowInfo;
  });

  const [pomodoroInput, setPomodoroInput] = useState(pomodoro);
  const [shortBreakInput, setShortBreakInput] = useState(shortBreak);
  const [longBreakInput, setLongBreakInput] = useState(longBreak);

  const timeString = useMemo(() => {
    const timeValue = convertSecondsToTimeValue(seconds);
    return convertTimeValueToString(timeValue);
  }, [seconds]);

  useEffect(() => {
    pomoTimer.setEventHandler((event) => {
      console.log(event);
      const {
        currentSeconds,
        currentPomoState,
        pomodoro,
        shortBreak,
        longBreak,
        currentTimerState,
        pomoFlowInfo,
      } = event.timerInfo;
      setSeconds(currentSeconds);
      setState(currentPomoState);
      setInfo({ pomodoro, shortBreak, longBreak });
      setTimterState(currentTimerState);
      setPomoFlowInfo(pomoFlowInfo);
    });
  }, []);

  useEffect(() => {
    pomoTimer.setAutoStart(autoStart);
  }, [autoStart]);

  const handleStateButtonClick = (state: PomoState) => {
    pomoTimer.changeToTargetPomoState(state);
  };

  const handleTimeValueUpdate = (state: PomoState | 'all') => {
    switch (state) {
      case 'pomodoro':
        pomoTimer.setPomodoro(pomodoroInput);
        break;
      case 'short-break':
        pomoTimer.setShortBreak(shortBreakInput);
        break;
      case 'long-break':
        pomoTimer.setLongBreak(longBreakInput);
        break;
      case 'all':
        pomoTimer.setTimeValues({
          pomodoro: pomodoroInput,
          shortBreak: shortBreakInput,
          longBreak: longBreakInput,
        });
        break;
    }
  };

  const handleChangePomoState = (direction: 'next' | 'previous') => {
    if (direction === 'next') {
      pomoTimer.changeToNextPomoState();
      return;
    }
    pomoTimer.changeToPreviousPomoState();
  };

  const PomoState = ({
    pomoIndex,
    state,
    currentPomoFlowIndex,
  }: {
    pomoIndex: number;
    state: PomoState;
    currentPomoFlowIndex: number;
  }) => (
    <span
      className={
        pomoIndex === currentPomoFlowIndex ? styles.activePomoIndex : undefined
      }
    >
      {state.substring(0, 1).toUpperCase()}
    </span>
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.label}>Pomodoro Timer</h1>
      <p className={styles['timer-state']}>Timer is {timerState}</p>
      <div className={styles.flow}>
        <button onClick={() => handleChangePomoState('previous')}>Prev</button>
        {pomoFlowInfo.pomoFlow.map((state, idx) => (
          <PomoState
            key={idx}
            pomoIndex={idx}
            state={state}
            currentPomoFlowIndex={pomoFlowInfo.currentPomoFlowIndex}
          />
        ))}
        <button onClick={() => handleChangePomoState('next')}>Next</button>
      </div>
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
        <button
          className={styles['set-at-once-button']}
          onClick={() => handleTimeValueUpdate('all')}
        >
          Set at once
        </button>
        <div className={styles['auto-start']}>
          <label htmlFor="auto-start">Auto Start</label>
          <input
            id="auto-start"
            type="checkbox"
            checked={autoStart}
            onChange={(e) => setAutoStart(e.target.checked)}
          />
        </div>
      </div>
      <div className={styles['pomo-states']}>
        <button
          className={
            state === 'pomodoro' ? styles['pomo-state-active'] : undefined
          }
          onClick={() => handleStateButtonClick('pomodoro')}
        >
          Pomodoro
        </button>
        <button
          className={
            state === 'short-break' ? styles['pomo-state-active'] : undefined
          }
          onClick={() => handleStateButtonClick('short-break')}
        >
          Short Break
        </button>
        <button
          className={
            state === 'long-break' ? styles['pomo-state-active'] : undefined
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
      <h1>{timeString}</h1>
    </div>
  );
};

export default PomoTest;
