import { TimerEventType } from '../timer/types';

export type PomoState = 'pomodoro' | 'short-break' | 'long-break';

export type PomoEventType = 'state-change' | TimerEventType;

export type PomoEvent = {
  type: PomoEventType;
  timerInfo: PomoTimerInfo;
};

export type PomoTimerInfo = {
  currentSeconds: number;
  currentState: PomoState;
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  autoStart: boolean;
  eventHandler?: PomoEventHandler;
};

export type PomoEventHandler = (event: PomoEvent) => void;

export type PomoConfig = {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  eventHandler?: PomoEventHandler;
  autoStart?: boolean; // When timer finish, should next state timer auto start
};
