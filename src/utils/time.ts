import { TimeValue } from '../types/time';

export function convertSecondsToTimeValue(seconds: number): TimeValue {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let remainingSeconds = seconds % 60;

  return {
    hours: hours,
    minutes: minutes,
    seconds: remainingSeconds,
  };
}
