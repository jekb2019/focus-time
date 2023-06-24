import { CountdownTimer, CountdownTimerImpl } from '../timer/CountdownTimer';
import { TimerEventHandler, TimerEventType } from '../timer/types';

type PomoState = 'pomodoro' | 'short-break' | 'long-break';
type PomoEventType = 'pomo-state-update' | TimerEventType;
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
  private countdownTimer: CountdownTimer;
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
    this.countdownTimer = new CountdownTimerImpl({
      startingSeconds,
      eventHandler: (event) => {
        const { eventType, timerInfo } = event;
        this.currentSeconds = timerInfo.currentSeconds;
        const pomoEvent = {
          type: eventType,
          timerInfo: this.getInfo(),
        };

        console.log(pomoEvent);
        if (this.eventHandler) {
          this.eventHandler(pomoEvent);
        }
      },
    });
  }

  setEventHandler(eventHandler: (event: PomoEvent) => void) {
    this.eventHandler = eventHandler;
  }

  startTimer() {
    this.countdownTimer.startTimer();
  }
  pauseTimer() {
    this.countdownTimer.pauseTimer();
  }

  resetTimer() {}

  changePomoState() {}
  changeToNextPomoState() {}
  changeToPreviousPomoState() {}
  setPomodoro(seconds: number) {}
  setShortBreak(seconds: number) {}
  setLongBreak(seconds: number) {}

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
