import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SettingField } from '../../../../service/timer/types';
import Modal from '../../../Modal/Modal';
import styles from './PomoSettingsModal.module.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import {
  DEFAULT_POMODORO_MINUTES,
  DEFAULT_SHORT_BREAK_MINUTES,
  DEFAULT_LONG_BREAK_MINUTES,
  PomodoroTimer,
} from '../../../../service/pomodoro/PomodoroTimer';
import { ONE_MINUTE_IN_SECONDS } from '../../../../utils/time';
import { setPomodoroTimerSettingsToLocalStorage } from '../../../../service/localStorage/pomodoroLocalStorage';
import { PomoPalette } from '../../../../service/pomodoro/pomoThemes';
import { CloseButton } from './styles';
import { Checkbox, FormControlLabel, Slider, Typography } from '@mui/material';
import { SoundPlayer } from '../../../../service/sound/SoundPlayer';
import { setVolumeSettingsToLocalStorage } from '../../../../service/localStorage/volumeLocalStorage';

type PomoSettingsModalProps = {
  isSettingsOpen: boolean;
  closeSettings: () => void;
  defaultSettingFocus: SettingField | null;
  pomodoroTimer: PomodoroTimer;
  pomodoroTotalMinutes: number;
  shortBreakTotalMinutes: number;
  longBreakTotalMinutes: number;
  isAutoStartEnabled: boolean;
  palette: PomoPalette;
  soundPlayer: SoundPlayer;
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
  palette,
  soundPlayer,
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
  const [volume, setVolume] = useState(() => soundPlayer.getVolume());

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
    if (pomodoroValue <= 0 || shortBreakValue <= 0 || longBreakValue <= 0) {
      alert('Time values must be greater than 0');
      return;
    }

    const timeValues = {
      pomodoro: pomodoroValue * ONE_MINUTE_IN_SECONDS,
      shortBreak: shortBreakValue * ONE_MINUTE_IN_SECONDS,
      longBreak: longBreakValue * ONE_MINUTE_IN_SECONDS,
    };
    pomodoroTimer.setTimeValues(timeValues);
    pomodoroTimer.setAutoStart(autoStartEnabled);
    soundPlayer.setAllVolumes(volume);

    setPomodoroTimerSettingsToLocalStorage({
      ...timeValues,
      autoStart: autoStartEnabled,
    });
    setVolumeSettingsToLocalStorage({ volume });

    closeSettings();
  };

  const revertInputValuesToDefault = () => {
    setPomodoroValue(DEFAULT_POMODORO_MINUTES);
    setShortBreakValue(DEFAULT_SHORT_BREAK_MINUTES);
    setLongBreakValue(DEFAULT_LONG_BREAK_MINUTES);
    setAutoStartEnabled(false);
    setVolume(0.7);
  };

  return (
    <Modal open={isSettingsOpen} onClose={closeSettings}>
      <div
        className={styles.container}
        style={{
          backgroundColor: palette.base,
        }}
      >
        <CloseButton
          className={styles.closeButton}
          onClick={closeSettings}
          $hoverColor={palette.accent}
        >
          <FontAwesomeIcon icon={faXmark} />
        </CloseButton>
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
            <FormControlLabel
              sx={{
                m: 0, // Set margin to 0 to remove the default margin
                height: 30,
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
              labelPlacement="start"
              control={
                <Checkbox
                  checked={autoStartEnabled}
                  onChange={(e) => setAutoStartEnabled(e.target.checked)}
                  sx={{
                    width: 20,
                    height: 30,
                    color: palette.accent,
                    '&.Mui-checked': {
                      color: palette.accent,
                    },
                  }}
                />
              }
              label={<Typography style={{}}>Auto Start</Typography>}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="auto-start">Volume</label>
            <Slider
              aria-label="Volume"
              value={Math.round(volume * 100)}
              onChange={(e, value) => setVolume((value as number) / 100)}
              step={1}
              valueLabelDisplay="auto"
              sx={{
                width: 120,
                color: palette.accent,
                '& .MuiSlider-thumb': {
                  '&:hover, &.Mui-focusVisible': {
                    boxShadow: 'none',
                  },
                  '&.Mui-active': {
                    boxShadow: 'none',
                  },
                },
              }}
            />
          </div>
          <div className={styles.revertButtonContainer}>
            <button
              className={styles.revertButton}
              onClick={revertInputValuesToDefault}
            >
              Revert to default settings
            </button>
          </div>
        </div>
        <div className={styles.buttons}>
          <button
            onClick={apply}
            style={{
              backgroundColor: palette.accent,
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PomoSettingsModal;
