import { TimeValue } from '../types/time';

export const ONE_MINUTE_IN_SECONDS = 60;

export function convertSecondsToTimeValue(secondsValue: number): TimeValue {
  let hours = Math.floor(secondsValue / 3600);
  let minutes = Math.floor((secondsValue % 3600) / 60);
  let seconds = secondsValue % 60;

  return {
    hours,
    minutes,
    seconds,
  };
}

export function convertTimeValueToString(timeValue: TimeValue): string {
  let hours = timeValue.hours.toString().padStart(2, '0');
  let minutes = timeValue.minutes.toString().padStart(2, '0');
  let seconds = timeValue.seconds.toString().padStart(2, '0');

  if (timeValue.hours > 0) {
    return `${hours}:${minutes}:${seconds}`;
  } else {
    return `${minutes}:${seconds}`;
  }
}
