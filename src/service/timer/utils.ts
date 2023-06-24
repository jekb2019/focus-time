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
