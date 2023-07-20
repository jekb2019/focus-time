import { TimerWorkerEvent } from '../workers/types';

export function runTimerWorker(callback: () => void, interval: number) {
  const worker = new Worker(
    new URL('../workers/timerWorker.ts', import.meta.url)
  );

  worker.postMessage(TimerWorkerEvent.Start);
  worker.onmessage = (e: MessageEvent<string>) => {
    if (e.data === TimerWorkerEvent.Tick) {
      callback();
    }
  };

  return () => {
    worker.postMessage(TimerWorkerEvent.Stop);
  };
}
