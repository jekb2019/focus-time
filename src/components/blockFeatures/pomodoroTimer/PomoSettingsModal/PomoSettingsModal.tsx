import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SettingField } from '../../../../service/timer/types';
import Modal from '../../../Modal/Modal';
import styles from './PomoSettingsModal.module.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { PomodoroTimer } from '../../../../service/pomodoro/PomodoroTimer';
import { ONE_MINUTE_IN_SECONDS } from '../../../../utils/time';

type PomoSettingsModalProps = {
  isSettingsOpen: boolean;
  closeSettings: () => void;
  defaultSettingFocus: SettingField | null;
  pomodoroTimer: PomodoroTimer;
  pomodoroTotalMinutes: number;
  shortBreakTotalMinutes: number;
  longBreakTotalMinutes: number;
  isAutoStartEnabled: boolean;
};

const PomoSettingsModal = ({
  isSettingsOpen,
  closeSettings,
  defaultSettingFocus,
  pomodoroTimer,
  pomodoroTotalMinutes,
  shortBreakTotalMinutes,
  longBreakTotalMinutes,
  isAutoStartEnabled,
}: PomoSettingsModalProps) => {
  const pomorodoRef = useRef<HTMLInputElement>(null);
  const shortBreakRef = useRef<HTMLInputElement>(null);
  const longBreakRef = useRef<HTMLInputElement>(null);

  const [pomodoroValue, setPomodoroValue] = useState(pomodoroTotalMinutes);
  const [shortBreakValue, setShortBreakValue] = useState(
    shortBreakTotalMinutes
  );
  const [longBreakValue, setLongBreakValue] = useState(longBreakTotalMinutes);
  const [autoStartEnabled, setAutoStartEnabled] = useState(isAutoStartEnabled);

  useEffect(() => {
    switch (defaultSettingFocus) {
      case 'pomodoro':
        pomorodoRef.current && pomorodoRef.current.select();
        break;
      case 'short-break':
        shortBreakRef.current && shortBreakRef.current.select();
        break;
      case 'long-break':
        longBreakRef.current && longBreakRef.current.select();
        break;
    }
  }, [defaultSettingFocus]);

  const apply = () => {
    pomodoroTimer.setTimeValues({
      pomodoro: pomodoroValue * ONE_MINUTE_IN_SECONDS,
      shortBreak: shortBreakValue * ONE_MINUTE_IN_SECONDS,
      longBreak: longBreakValue * ONE_MINUTE_IN_SECONDS,
    });
    pomodoroTimer.setAutoStart(autoStartEnabled);
    console.log('Applying');
    closeSettings();
  };

  return (
    <Modal open={isSettingsOpen} onClose={closeSettings}>
      <div className={styles.container}>
        <button className={styles.closeButton} onClick={closeSettings}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <h2 className={styles.title}>Settings</h2>
        <div className={styles.settings}>
          <div className={styles.field}>
            <label htmlFor="pomodoro">Focus (minutes)</label>
            <input
              ref={pomorodoRef}
              className={styles.inputField}
              id="pomodoro"
              type="number"
              value={pomodoroValue}
              onChange={(e) => setPomodoroValue(Number(e.target.value))}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="short-break">Short break (minutes)</label>
            <input
              ref={shortBreakRef}
              className={styles.inputField}
              id="short-break"
              type="number"
              value={shortBreakValue}
              onChange={(e) => setShortBreakValue(Number(e.target.value))}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="long-break">Long break (minutes)</label>
            <input
              ref={longBreakRef}
              className={styles.inputField}
              id="long-break"
              type="number"
              value={longBreakValue}
              onChange={(e) => setLongBreakValue(Number(e.target.value))}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="auto-start">Auto Start</label>
            <input
              className={styles.checkbox}
              id="auto-start"
              type="checkbox"
              checked={autoStartEnabled}
              onChange={(e) => setAutoStartEnabled(e.target.checked)}
            />
          </div>
        </div>
        <div className={styles.buttons}>
          <button onClick={apply}>Apply</button>
        </div>
      </div>
    </Modal>
  );
};

export default PomoSettingsModal;
