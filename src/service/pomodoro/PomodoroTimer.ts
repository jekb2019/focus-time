import { findClosestAndBiggerNumber } from '../../utils/array';
import { CountdownTimer, CountdownTimerImpl } from '../timer/CountdownTimer';
import { TimerState } from '../timer/types';
import { InvalidPomoStateError, InvalidTimeValueSettingError } from './errors';
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
  changeToNextPomoState(): void;
  changeToPreviousPomoState(): void;
  changeToTargetPomoState(state: PomoState): void;
  setTimeValues(setting: {
    pomodoro?: number;
    shortBreak?: number;
    longBreak?: number;
  }): void;
  setPomodoro(seconds: number): void;
  setShortBreak(seconds: number): void;
  setLongBreak(seconds: number): void;
  setEventHandler(eventHandler: (event: PomoEvent) => void): void;
  setAutoStart(shouldAutoStart: boolean): void;
  getInfo(): PomoTimerInfo;
}

export class PomodoroTimerImpl implements PomodoroTimer {
  // Constants
  private POMO_FLOW: PomoState[] = [
    'pomodoro',
    'short-break',
    'pomodoro',
    'short-break',
    'pomodoro',
    'short-break',
    'pomodoro',
    'long-break',
  ];

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
  private currentTimerState: TimerState | 'initialized' = 'initialized';
  private currentPomoFlowIndex = 0;
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
        this.currentTimerState = timerInfo.state;
        this.fireEvent(eventType);

        if (eventType === 'finish') {
          setTimeout(() => {
            this.changeToNextPomoState();
          }, 1000);
        }
      },
    });
  }

  private getNextPomoFlowIndex() {
    const maxIndex = this.POMO_FLOW.length - 1;
    const tempNextIndex = this.currentPomoFlowIndex + 1;
    if (tempNextIndex > maxIndex) {
      return 0;
    }
    return tempNextIndex;
  }

  private getPreviousPomoFlowIndex() {
    const tempPreviousIndex = this.currentPomoFlowIndex - 1;
    if (tempPreviousIndex < 0) {
      return this.POMO_FLOW.length - 1;
    }
    return tempPreviousIndex;
  }

  private changePomoState(state: PomoState, shouldAutoStart: boolean) {
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

  private guardTimeSetting(seconds: number) {
    if (seconds <= 0) {
      throw new InvalidTimeValueSettingError(
        'Time value must be greater than 0 seconds'
      );
    }
  }

  private getTotalSecondsOfCurrentPomoState(): number {
    switch (this.currentPomoState) {
      case 'pomodoro':
        return this.pomodoro;
      case 'short-break':
        return this.shortBreak;
      case 'long-break':
        return this.longBreak;
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
    if (this.currentPomoState === 'short-break') {
      resetSeconds = this.shortBreak;
    } else if (this.currentPomoState === 'long-break') {
      resetSeconds = this.longBreak;
    }

    this.createTimer(resetSeconds);
  }

  changeToNextPomoState() {
    const nextPomoFlowIndex = this.getNextPomoFlowIndex();
    this.currentPomoFlowIndex = nextPomoFlowIndex;
    const nextPomoState = this.POMO_FLOW[nextPomoFlowIndex];
    this.changePomoState(nextPomoState, this.autoStart);
  }

  changeToPreviousPomoState() {
    const previousPomoFlowIndex = this.getPreviousPomoFlowIndex();
    this.currentPomoFlowIndex = previousPomoFlowIndex;
    const previousPomoState = this.POMO_FLOW[previousPomoFlowIndex];
    this.changePomoState(previousPomoState, this.autoStart);
  }

  changeToTargetPomoState(state: PomoState) {
    if (this.currentPomoState === state) {
      return;
    }

    const possibleIndices: number[] = [];
    for (const index in this.POMO_FLOW) {
      if (this.POMO_FLOW[index] === state) {
        possibleIndices.push(Number(index));
      }
    }

    const targetIndex = findClosestAndBiggerNumber(
      this.currentPomoFlowIndex,
      possibleIndices
    );

    this.currentPomoFlowIndex = targetIndex;
    this.changePomoState(state, this.autoStart);
  }

  // Setters
  setTimeValues(setting: {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
  }) {
    const { pomodoro, shortBreak, longBreak } = setting;
    this.guardTimeSetting(pomodoro);
    this.guardTimeSetting(shortBreak);
    this.guardTimeSetting(longBreak);

    let shouldFireEvent = false;

    if (pomodoro !== this.pomodoro) {
      shouldFireEvent = true;
      if (this.currentPomoState === 'pomodoro') {
        this.createTimer(pomodoro);
      }
    }

    if (shortBreak !== this.shortBreak) {
      shouldFireEvent = true;
      if (this.currentPomoState === 'short-break') {
        this.createTimer(shortBreak);
      }
    }

    if (longBreak !== this.longBreak) {
      shouldFireEvent = true;
      if (this.currentPomoState === 'long-break') {
        this.createTimer(longBreak);
      }
    }

    this.pomodoro = pomodoro;
    this.shortBreak = shortBreak;
    this.longBreak = longBreak;

    if (shouldFireEvent) {
      this.fireEvent('time-setting-change');
    }
  }

  setPomodoro(seconds: number) {
    this.guardTimeSetting(seconds);
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
    this.guardTimeSetting(seconds);
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
    this.guardTimeSetting(seconds);
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
      currentTimerState: this.currentTimerState,
      pomoFlowInfo: {
        pomoFlow: this.POMO_FLOW,
        currentPomoFlowIndex: this.currentPomoFlowIndex,
      },
      totalSecondsOfCurrentPomoState: this.getTotalSecondsOfCurrentPomoState(),
    };
  }
}
