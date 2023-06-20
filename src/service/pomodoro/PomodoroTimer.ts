import { CountdownTimer, CountdownTimerImpl } from '../timer/CountdownTimer';

type PomoState = 'pomodoro' | 'short-break' | 'long-break';
type PomoEventType = 'pomo-state-update' | 'start' | 'pause';
type PomoEvent = {
  type: PomoEventType;
  payload: any;
};
type PomoTimerInfo = {
  currentSeconds: number;
  currentState: PomoState;
  currentRound: number;
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  totalRounds: number;
};
type PomoEventHandler = (event: PomoEvent) => void;

type PomoConfig = {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  totalRounds: number;
  eventHandler?: PomoEventHandler;
};

export interface PomodoroTimer {
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  changePomoState: (pomoState: PomoState) => void;
  changeToNextPomoState: () => void;
  changeToPreviousPomoState: () => void;
  setPomodoro: (seconds: number) => void;
  setShortBreak: (seconds: number) => void;
  setLongBreak: (seconds: number) => void;
  getInfo: () => PomoTimerInfo;
}

export class PomodoroTimerImpl implements PomodoroTimer {
  private currentState: PomoState = 'pomodoro';
  private currentRound = 1;
  private currentSeconds;

  private pomodoro;
  private shortBreak;
  private longBreak;
  private totalRounds;
  private eventHandler;

  private countdownTimer: CountdownTimer;

  constructor(pomoConfig: PomoConfig) {
    const { pomodoro, shortBreak, longBreak, totalRounds, eventHandler } =
      pomoConfig;

    this.pomodoro = pomodoro;
    this.shortBreak = shortBreak;
    this.longBreak = longBreak;
    this.totalRounds = totalRounds;
    this.eventHandler = eventHandler;

    this.currentSeconds = pomodoro;
  }

  private createCountdownTimer(
    startingSeconds: number,
    eventHandler?: PomoEventHandler
  ) {
    //    this.countdownTimer = new CountdownTimerImpl({
    //       startingSeconds: startingSeconds,
    //       eventHandler: eventHandler,
    //     });
  }

  startTimer() {}
  pauseTimer() {}
  resetTimer() {}

  changePomoState() {}
  changeToNextPomoState() {}
  changeToPreviousPomoState() {}

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
      totalRounds: this.totalRounds,
    };
  }
}
