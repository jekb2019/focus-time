export function abc(fn: () => void, delay: number): () => void {
  let startTime = Date.now();
  let expectedDelay = delay;
  let intervalId: NodeJS.Timeout;

  function tick() {
    fn();
    const elapsedTime = Date.now() - startTime;
    const adjustment = elapsedTime % delay;
    expectedDelay = delay - adjustment;
    intervalId = setTimeout(tick, expectedDelay);
  }

  intervalId = setTimeout(tick, delay);

  function clearAccurateInterval() {
    clearTimeout(intervalId);
  }

  return clearAccurateInterval;
}

export function accurateSetInterval(callback: () => void, interval: number) {
  let counter = 1;
  let timeoutId: number;
  const startTime = Date.now();

  function main() {
    const nowTime = Date.now();
    const nextTime = startTime + counter * interval;
    timeoutId = window.setTimeout(main, interval - (nowTime - nextTime));
    counter += 1;
    callback();
  }

  timeoutId = window.setTimeout(main, interval);

  return () => {
    clearTimeout(timeoutId);
  };
}
