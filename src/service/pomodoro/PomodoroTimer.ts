import { CountdownTimer, CountdownTimerImpl } from '../timer/CountdownTimer';
import { TimerEventHandler, TimerEventType } from '../timer/types';

type PomoState = 'pomodoro' | 'short-break' | 'long-break';
type PomoEventType = 'state-change' | TimerEventType;
type PomoEvent = {
  type: PomoEventType;
  timerInfo: PomoTimerInfo;
};
type PomoTimerInfo = {
  currentSeconds: number;
  currentState: PomoState;
  currentRound: number;
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  eventHandler?: PomoEventHandler;
};
type PomoEventHandler = (event: PomoEvent) => void;

type PomoConfig = {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  eventHandler?: PomoEventHandler;
};

// export interface PomodoroTimer {
//   startTimer: () => void;
//   pauseTimer: () => void;
//   resetTimer: () => void;
//   changePomoState: (pomoState: PomoState) => void;
//   changeToNextPomoState: () => void;
//   changeToPreviousPomoState: () => void;
//   setPomodoro: (seconds: number) => void;
//   setShortBreak: (seconds: number) => void;
//   setLongBreak: (seconds: number) => void;
//   getInfo: () => PomoTimerInfo;
// }

export class PomodoroTimerImpl {
  // Util
  private countdownTimer: CountdownTimer | null = null;
  private eventHandler?: PomoEventHandler;

  // States
  private currentSeconds: number;
  private currentState: PomoState = 'pomodoro';
  private currentRound: number = 1;
  private pomodoro: number;
  private shortBreak: number;
  private longBreak: number;

  constructor(config: PomoConfig) {
    const { pomodoro, shortBreak, longBreak } = config;

    this.pomodoro = pomodoro;
    this.shortBreak = shortBreak;
    this.longBreak = longBreak;
    this.currentSeconds = pomodoro;
    this.createTimer(pomodoro);
  }

  private createTimer(startingSeconds: number) {
    if (this.countdownTimer) {
      this.countdownTimer.destroyTimer();
    }

    this.countdownTimer = new CountdownTimerImpl({
      startingSeconds,
      eventHandler: (event) => {
        const { eventType, timerInfo } = event;
        this.currentSeconds = timerInfo.currentSeconds;
        this.fireEvent(eventType);
      },
    });
  }

  private fireEvent(eventType: PomoEventType) {
    const pomoEvent = {
      type: eventType,
      timerInfo: this.getInfo(),
    };
    console.log(pomoEvent);
    if (this.eventHandler) {
      this.eventHandler(pomoEvent);
    }
  }

  setEventHandler(eventHandler: (event: PomoEvent) => void) {
    this.eventHandler = eventHandler;
  }

  startTimer() {
    if (this.countdownTimer) {
      this.countdownTimer.startTimer();
    }
  }
  pauseTimer() {
    if (this.countdownTimer) {
      this.countdownTimer.pauseTimer();
    }
  }

  resetTimer() {
    let resetSeconds = this.pomodoro;
    if (this.currentState === 'short-break') {
      resetSeconds = this.shortBreak;
    } else if (this.currentState === 'long-break') {
      resetSeconds = this.longBreak;
    }

    this.createTimer(resetSeconds);
  }

  changeToNextPomoState() {
    let nextState: PomoState = 'short-break';
    if (this.currentState === 'short-break') {
      nextState = 'long-break';
    } else if (this.currentState === 'long-break') {
      nextState = 'pomodoro';
    }
    this.changePomoState(nextState);
  }

  changePomoState(state: PomoState) {
    this.currentState = state;
    this.fireEvent('state-change');
  }

  setPomodoro(seconds: number) {
    this.pomodoro = seconds;
  }

  setShortBreak(seconds: number) {
    this.shortBreak = seconds;
  }

  setLongBreak(seconds: number) {
    this.longBreak = seconds;
  }

  getInfo() {
    return {
      currentSeconds: this.currentSeconds,
      currentState: this.currentState,
      currentRound: this.currentRound,
      pomodoro: this.pomodoro,
      shortBreak: this.shortBreak,
      longBreak: this.longBreak,
      eventHandler: this.eventHandler,
    };
  }
}
