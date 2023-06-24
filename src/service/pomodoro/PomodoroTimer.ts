import { CountdownTimer, CountdownTimerImpl } from '../timer/CountdownTimer';
import { TimerEventType } from '../timer/types';

export type PomoState = 'pomodoro' | 'short-break' | 'long-break';
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
  autoStart?: boolean; // When timer finish, should next state timer auto start
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

  setPomodoro(seconds: number) {
    this.pomodoro = seconds;
  }

  setShortBreak(seconds: number) {
    this.shortBreak = seconds;
  }

  setLongBreak(seconds: number) {
    this.longBreak = seconds;
  }

  setAutoStart(shouldAutoStart: boolean) {
    this.autoStart = shouldAutoStart;
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
