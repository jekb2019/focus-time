export type TimerState =
  | 'idle'
  | 'running'
  | 'paused'
  | 'finished'
  | 'destroyed';

export type TimerEventType =
  | 'create'
  | 'start'
  | 'pause'
  | 'finish'
  | 'destroy'
  | 'tick';

export type TimerInfo = {
  currentSeconds: number;
  state: TimerState;
};

type TimerEvent = {
  eventType: TimerEventType;
  timerInfo: TimerInfo;
};

export type TimerEventHandler = (event: TimerEvent) => void;

export type CountdownTimerConfig = {
  eventHandler: TimerEventHandler;
  startingSeconds: number;
};

export type SettingField =
  | 'pomodoro'
  | 'short-break'
  | 'long-break'
  | 'auto-start'
  | 'volume';
