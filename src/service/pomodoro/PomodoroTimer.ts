import { CountdownTimer, CountdownTimerImpl } from '../timer/CountdownTimer';
import { TimerEventType } from '../timer/types';
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
  private currentState: PomoState = 'pomodoro';
  private currentRound: number = 1;
  private autoStart: boolean = false;

  constructor(config: PomoConfig) {
    const { pomodoro, shortBreak, longBreak, autoStart } = config;

    this.pomodoro = pomodoro;
    this.shortBreak = shortBreak;
    this.longBreak = longBreak;
    this.currentSeconds = pomodoro;

    if (autoStart) {
      this.autoStart = autoStart;
    }

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

        if (eventType === 'finish') {
          setTimeout(() => {
            this.changeToNextPomoState();
          }, 1000);
        }
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
    this.changePomoState(nextState, this.autoStart);
  }

  changePomoState(state: PomoState, shouldAutoStart?: boolean) {
    if (this.currentState === state) {
      return;
    }

    this.currentState = state;

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
        throw new Error('Unkown Pomo State');
    }

    this.fireEvent('state-change');
    this.createTimer(startingSeconds);

    if (shouldAutoStart) {
      this.startTimer();
    }
  }

  // Setters
  setPomodoro(seconds: number) {
    this.pomodoro = seconds;
  }

  setShortBreak(seconds: number) {
    this.shortBreak = seconds;
  }

  setLongBreak(seconds: number) {
    this.longBreak = seconds;
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
      currentState: this.currentState,
      currentRound: this.currentRound,
      pomodoro: this.pomodoro,
      shortBreak: this.shortBreak,
      longBreak: this.longBreak,
      autoStart: this.autoStart,
      eventHandler: this.eventHandler,
    };
  }
}
