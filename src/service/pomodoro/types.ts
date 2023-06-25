import { TimerEventType, TimerState } from '../timer/types';

export type PomoState = 'pomodoro' | 'short-break' | 'long-break';

export type PomoEventType =
  | TimerEventType
  | 'state-change'
  | 'pomodoro-change'
  | 'short-break-change'
  | 'long-break-change';

export type PomoEvent = {
  type: PomoEventType;
  timerInfo: PomoTimerInfo;
};

export type PomoTimerInfo = {
  currentSeconds: number;
  currentPomoState: PomoState;
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  autoStart: boolean;
  eventHandler?: PomoEventHandler;
  currentTimerState: TimerState | 'not-ready';
};

export type PomoEventHandler = (event: PomoEvent) => void;

export type PomoConfig = {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  eventHandler?: PomoEventHandler;
  autoStart?: boolean; // When timer finish, should next state timer auto start
};
