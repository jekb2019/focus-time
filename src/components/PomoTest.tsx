import { useEffect, useState } from 'react';
import { PomodoroTimerImpl } from '../service/pomodoro/PomodoroTimer';

const pomodoro = 5;
const shortBreak = 2;
const longBreak = 3;

const pomoTimer = new PomodoroTimerImpl({
  pomodoro,
  shortBreak,
  longBreak,
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

  return (
    <div>
      <h1>Pomo Test</h1>
      <div>
        <span>State: {state}</span>
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
      <h1>{seconds}</h1>
    </div>
  );
};

export default PomoTest;
