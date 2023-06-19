import { useEffect, useState } from 'react';
import {
  CountdownTimer,
  CountdownTimerImpl,
} from './service/timer/CountdownTimer';

const startingSeconds = 5;
const countdownTimer: CountdownTimer = new CountdownTimerImpl({
  startingSeconds,
  eventHandler: () => {},
});

function App() {
  const [count, setCount] = useState(startingSeconds);

  useEffect(() => {
    countdownTimer.setEventHandler((event) => {
      const { eventType, timerInfo } = event;
      const { currentSeconds } = timerInfo;
      setCount(currentSeconds);
    });
  }, []);

  const start = () => {
    countdownTimer.startTimer();
  };

  const pause = () => {
    countdownTimer.pauseTimer();
  };

  const printInfo = () => {
    const info = countdownTimer.getTimerInfo();
    console.log(info);
  };

  const destroy = () => {
    countdownTimer.destroyTimer();
  };

  return (
    <div>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={destroy}>Destroy</button>
      <button onClick={printInfo}>Get Info</button>
      <br />
      <h1>{count}</h1>
    </div>
  );
}

export default App;
