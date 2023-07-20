/* eslint-disable no-restricted-globals */
import { ONE_SECOND_INTERVAL } from '../timer/constants';
import { TimerWorkerEvent } from './types';

let timeoutId: number;

onmessage = (e: MessageEvent<string>) => {
  if (e.data === TimerWorkerEvent.Start) {
    accurateSetInterval(function () {
      postMessage(TimerWorkerEvent.Tick);
    }, ONE_SECOND_INTERVAL);
  } else {
    clearTimeout(timeoutId);
  }
};

const accurateSetInterval = (callback: () => void, interval: number) => {
  let counter = 1;
  const startTime = Date.now();

  function main() {
    const nowTime = Date.now();
    const nextTime = startTime + counter * interval;
    timeoutId = self.setTimeout(main, interval - (nowTime - nextTime));
    counter += 1;
    callback();
  }

  timeoutId = self.setTimeout(main, interval);
};

export {};
