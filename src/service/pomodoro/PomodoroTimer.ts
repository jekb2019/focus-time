import { CountdownTimer, CountdownTimerImpl } from '../timer/CountdownTimer';
import { InvalidPomoStateError } from './errors';
import {
  PomoConfig,
  PomoEvent,
  PomoEventHandler,
  PomoEventType,
  PomoState,
  PomoTimerInfo,
} from './types';

export interface PomodoroTimer {
  startTimer(): void;
  pauseTimer(): void;
  resetTimer(): void;
  changeToNextPomoState(state: PomoState, shouldAutoStart?: boolean): void;
  changePomoState(state: PomoState, shouldAutoStart?: boolean): void;
  setPomodoro(seconds: number): void;
  setShortBreak(seconds: number): void;
  setLongBreak(seconds: number): void;
  setEventHandler(eventHandler: (event: PomoEvent) => void): void;
  setAutoStart(shouldAutoStart: boolean): void;
  getInfo(): PomoTimerInfo;
}

export class PomodoroTimerImpl implements PomodoroTimer {
  // Internal
  private countdownTimer: CountdownTimer | null = null;

  // Settings
  private pomodoro: number;
  private shortBreak: number;
  private longBreak: number;
  private eventHandler?: PomoEventHandler;

  // States
  private currentSeconds: number;
  private currentPomoState: PomoState = 'pomodoro';
  private autoStart: boolean = false;

  constructor(config: PomoConfig) {
    const { pomodoro, shortBreak, longBreak, autoStart, eventHandler } = config;

    this.pomodoro = pomodoro;
    this.shortBreak = shortBreak;
    this.longBreak = longBreak;
    this.currentSeconds = pomodoro;

    if (autoStart) {
      this.autoStart = autoStart;
    }

    if (eventHandler) {
      this.eventHandler = eventHandler;
    }

    this.createTimer(pomodoro);
  }

  private fireEvent(eventType: PomoEventType) {
    const pomoEvent = {
      type: eventType,
      timerInfo: this.getInfo(),
    };
    if (this.eventHandler) {
      this.eventHandler(pomoEvent);
    }
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

        if (eventType === 'finish') {
          setTimeout(() => {
            this.changeToNextPomoState();
          }, 1000);
        }
      },
    });
  }

  // Operations
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
    if (this.currentPomoState === 'short-break') {
      resetSeconds = this.shortBreak;
    } else if (this.currentPomoState === 'long-break') {
      resetSeconds = this.longBreak;
    }

    this.createTimer(resetSeconds);
  }

  changeToNextPomoState() {
    let nextState: PomoState = 'short-break';
    if (this.currentPomoState === 'short-break') {
      nextState = 'long-break';
    } else if (this.currentPomoState === 'long-break') {
      nextState = 'pomodoro';
    }
    this.changePomoState(nextState, this.autoStart);
  }

  changePomoState(state: PomoState, shouldAutoStart?: boolean) {
    if (this.currentPomoState === state) {
      return;
    }

    this.currentPomoState = state;

    let startingSeconds;
    switch (state) {
      case 'pomodoro':
        startingSeconds = this.pomodoro;
        break;
      case 'long-break':
        startingSeconds = this.longBreak;
        break;
      case 'short-break':
        startingSeconds = this.shortBreak;
        break;
      default:
        throw new InvalidPomoStateError(`${state} is not a valid PomoState`);
    }

    this.fireEvent('state-change');
    this.createTimer(startingSeconds);

    if (shouldAutoStart) {
      this.startTimer();
    }
  }

  // Setters
  setPomodoro(seconds: number) {
    if (seconds === this.pomodoro) {
      return;
    }
    this.pomodoro = seconds;
    if (this.currentPomoState === 'pomodoro') {
      this.createTimer(seconds);
    }
    this.fireEvent('pomodoro-change');
  }

  setShortBreak(seconds: number) {
    if (seconds === this.shortBreak) {
      return;
    }
    this.shortBreak = seconds;
    if (this.currentPomoState === 'short-break') {
      this.createTimer(seconds);
    }
    this.fireEvent('short-break-change');
  }

  setLongBreak(seconds: number) {
    if (seconds === this.longBreak) {
      return;
    }
    this.longBreak = seconds;
    if (this.currentPomoState === 'long-break') {
      this.createTimer(seconds);
    }
    this.fireEvent('long-break-change');
  }

  setEventHandler(eventHandler: (event: PomoEvent) => void) {
    this.eventHandler = eventHandler;
  }

  setAutoStart(shouldAutoStart: boolean) {
    this.autoStart = shouldAutoStart;
  }

  getInfo(): PomoTimerInfo {
    return {
      currentSeconds: this.currentSeconds,
      currentPomoState: this.currentPomoState,
      pomodoro: this.pomodoro,
      shortBreak: this.shortBreak,
      longBreak: this.longBreak,
      autoStart: this.autoStart,
      eventHandler: this.eventHandler,
      currentTimerState: this.countdownTimer
        ? this.countdownTimer.getTimerInfo().state
        : 'not-ready',
    };
  }
}
