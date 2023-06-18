import { useCallback, useRef, useState } from 'react';
import { accurateSetInterval } from './service/timer/utils';

function App() {
  const [count, setCount] = useState(0);
  const stop = useRef(() => {});

  const start = () => {
    stop.current = accurateSetInterval(
      () => setCount((prev) => prev + 1),
      1000
    );
  };

  return (
    <div>
      <button onClick={start}>Start</button>
      <span>{count}</span>
      <button onClick={stop.current}>Stop</button>
    </div>
  );
}

export default App;
