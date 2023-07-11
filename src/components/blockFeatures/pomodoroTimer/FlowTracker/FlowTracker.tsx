import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './FlowTracker.module.css';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { PomoFlowInfo, PomoState } from '../../../../service/pomodoro/types';
import { useMemo } from 'react';
import { PomodoroTimer } from '../../../../service/pomodoro/PomodoroTimer';

type FlowTrackerProps = {
  currentPomoState: PomoState;
  pomoFlowInfo: PomoFlowInfo;
  pomodoroTimer: PomodoroTimer;
};

const FlowTracker = ({
  pomodoroTimer,
  currentPomoState,
  pomoFlowInfo,
}: FlowTrackerProps) => {
  const isFocusTime = currentPomoState === 'pomodoro';
  const isShortBreak = currentPomoState === 'short-break';
  const isLongBreak = currentPomoState === 'long-break';

  const { pomoFlow, currentPomoFlowIndex } = useMemo(
    () => pomoFlowInfo,
    [pomoFlowInfo]
  );

  const getStateFirstCharacter = (state: PomoState) => {
    if (state === 'long-break') {
      return 'L';
    }
    if (state === 'short-break') {
      return 'S';
    }
    if (state === 'pomodoro') {
      return 'F';
    }
    throw new Error('Unrecognized pomodoro state');
  };

  return (
    <div className={styles.container}>
      <div className={styles.selectors}>
        <button
          className={`${isFocusTime ? styles.activeSelector : undefined} ${
            styles.selector
          }`}
          onClick={() => pomodoroTimer.changeToTargetPomoState('pomodoro')}
        >
          Focus
        </button>
        <button
          className={`${isShortBreak ? styles.activeSelector : undefined} ${
            styles.selector
          }`}
          onClick={() => pomodoroTimer.changeToTargetPomoState('short-break')}
        >
          Short Break
        </button>
        <button
          className={`${isLongBreak ? styles.activeSelector : undefined} ${
            styles.selector
          }`}
          onClick={() => pomodoroTimer.changeToTargetPomoState('long-break')}
        >
          Long Break
        </button>
      </div>
      <div className={styles.tracker}>
        <button
          className={styles.traversor}
          onClick={() => pomodoroTimer.changeToPreviousPomoState()}
        >
          <FontAwesomeIcon className={styles.arrow} icon={faArrowLeft} />
        </button>
        {pomoFlow.map((value, idx) => (
          <span
            key={idx}
            className={`${styles.state} ${
              currentPomoFlowIndex === idx ? styles.activeState : undefined
            }`}
          >
            {getStateFirstCharacter(value)}
          </span>
        ))}
        <button
          className={styles.traversor}
          onClick={() => pomodoroTimer.changeToNextPomoState()}
        >
          <FontAwesomeIcon className={styles.arrow} icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default FlowTracker;
