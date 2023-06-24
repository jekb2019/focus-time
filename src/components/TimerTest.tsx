import { useEffect, useState } from 'react';
import {
  CountdownTimer,
  CountdownTimerImpl,
} from '../service/timer/CountdownTimer';

const startingSeconds = 5;

const TimerTest = () => {
  const [countdownTimer, setCountdownTimer] = useState<CountdownTimer | null>(
    null
  );
  const [count, setCount] = useState(startingSeconds);

  useEffect(() => {
    const countdownTimer = new CountdownTimerImpl({
      startingSeconds,
      eventHandler: (event) => {
        const { eventType, timerInfo } = event;
        const { currentSeconds } = timerInfo;
        setCount(currentSeconds);
      },
    });
    setCountdownTimer(countdownTimer);
  }, []);

  const start = () => {
    if (countdownTimer) {
      countdownTimer.startTimer();
    }
  };

  const pause = () => {
    if (countdownTimer) {
      countdownTimer.pauseTimer();
    }
  };

  const printInfo = () => {
    if (countdownTimer) {
      const info = countdownTimer.getTimerInfo();
      console.log(info);
    }
  };

  const destroy = () => {
    if (countdownTimer) {
      countdownTimer.destroyTimer();
    }
  };

  return (
    <div
      style={{
        border: '1px solid black',
      }}
    >
      <h1>Timer Test</h1>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={destroy}>Destroy</button>
      <button onClick={printInfo}>Get Info</button>
      <br />
      <h1>{count}</h1>
    </div>
  );
};

export default TimerTest;
