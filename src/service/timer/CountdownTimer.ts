import { ONE_SECOND_INTERVAL } from './constants';
import {
  InvalidOperationError,
  InvalidConstructorCallError,
  UnexpectedError,
} from './errors';
import {
  CountdownTimerConfig,
  TimerEventHandler,
  TimerEventType,
  TimerInfo,
  TimerState,
} from './types';
import { accurateSetInterval } from './utils';

export interface CountdownTimer {
  startTimer: () => void;
  pauseTimer: () => void;
  getTimerInfo: () => TimerInfo;
  destroyTimer: () => void;
  setEventHandler: (eventHandler: TimerEventHandler) => void;
}

export class CountdownTimerImpl implements CountdownTimer {
  private currentSeconds: number;
  private state: TimerState;
  private clearTimer: null | (() => void) = null;
  private eventHandler?: TimerEventHandler;

  constructor(config: CountdownTimerConfig) {
    const { eventHandler, startingSeconds } = config;

    if (startingSeconds < 1) {
      throw new InvalidConstructorCallError(
        'Starting seconds should be a positive number'
      );
    }

    this.eventHandler = eventHandler;
    this.currentSeconds = startingSeconds;
    this.state = 'idle';
  }

  private fireEvent(eventType: TimerEventType) {
    if (!this.eventHandler) {
      return;
    }
    this.eventHandler({
      eventType: eventType,
      timerInfo: this.getTimerInfo(),
    });
  }

  private updateState(newState: TimerState, eventType?: TimerEventType) {
    this.state = newState;
    if (eventType) {
      this.fireEvent(eventType);
    }
  }

  private handleTimerFinish() {
    (this.clearTimer as () => void)();
    this.updateState('finished', 'finish');
  }

  private guardDestroyed() {
    if (this.state === 'destroyed') {
      throw new InvalidOperationError('Cannot use a destroyed timer');
    }
  }

  setEventHandler(eventHandler: TimerEventHandler) {
    this.guardDestroyed();
    this.eventHandler = eventHandler;
  }

  startTimer() {
    this.guardDestroyed();
    if (this.currentSeconds <= 0) {
      throw new InvalidOperationError('Cannot start a finished timer');
    }

    this.updateState('running', 'start');
    this.clearTimer = accurateSetInterval(() => {
      this.currentSeconds--;
      this.fireEvent('tick');

      if (this.currentSeconds === 0) {
        this.handleTimerFinish();
      }
    }, ONE_SECOND_INTERVAL);
  }

  pauseTimer() {
    this.guardDestroyed();
    if (this.state !== 'running') {
      return;
    }
    if (!this.clearTimer) {
      throw new UnexpectedError(
        'Unexpected error occured while pausing a timer. Timer may not exist!'
      );
    }

    this.clearTimer();
    this.updateState('paused', 'pause');
  }

  getTimerInfo() {
    return {
      currentSeconds: this.currentSeconds,
      state: this.state,
    };
  }

  destroyTimer() {
    if (this.clearTimer) {
      this.clearTimer();
    }
    this.currentSeconds = 0;
    this.updateState('destroyed', 'destroy');
    this.eventHandler = undefined;
  }
}
