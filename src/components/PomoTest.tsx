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

  useEffect(() => {
    pomoTimer.setEventHandler((event) => {
      const { currentSeconds } = event.timerInfo;
      setSeconds(currentSeconds);
    });
  }, []);

  return (
    <div>
      <h1>Pomo Test</h1>
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
      <button onClick={() => console.log(pomoTimer.getInfo())}>Info</button>
      <h1>{seconds}</h1>
    </div>
  );
};

export default PomoTest;
