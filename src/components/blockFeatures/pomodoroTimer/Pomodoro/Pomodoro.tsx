import { useEffect, useMemo, useState } from 'react';
import ContentBox from '../../../ContentBox/ContentBox';
import FlowTracker from '../FlowTracker/FlowTracker';
import PomoSettings from '../PomoSettings/PomoSettings';
import Timer from '../Timer/Timer';
import TimerProgress from '../TimerProgress/TimerProgress';
import styles from './Pomodoro.module.css';
import PomoSettingsModal from '../PomoSettingsModal/PomoSettingsModal';
import { SettingField } from '../../../../service/timer/types';
import { PomodoroTimer } from '../../../../service/pomodoro/PomodoroTimer';
import { PomoTimerInfo } from '../../../../service/pomodoro/types';
import {
  convertSecondsToTimeValue,
  convertTimeValueToString,
  secondsToMinutes,
} from '../../../../utils/time';
import { getPomoColorPalette } from '../../../../service/pomodoro/pomoThemes';
import { changeTabTitle } from '../../../../service/browser/browser';

type PomorodoProps = {
  pomodoroTimer: PomodoroTimer;
};

const Pomodoro = ({ pomodoroTimer }: PomorodoProps) => {
  const [timerStatus, setTimerStatus] = useState<PomoTimerInfo>(() =>
    pomodoroTimer.getInfo()
  );

  useEffect(() => {
    pomodoroTimer.setEventHandler((event) => setTimerStatus(event.timerInfo));
  }, []);

  const {
    currentSeconds,
    currentTimerState,
    currentPomoState,
    pomoFlowInfo,
    totalSecondsOfCurrentPomoState,
    pomodoro: pomodoroTotalSeconds,
    shortBreak: shortBreakTotalSeconds,
    longBreak: longBreakTotalSeconds,
    autoStart: isAutoStartEnabled,
  } = useMemo(() => {
    return timerStatus;
  }, [timerStatus]);

  useEffect(() => {
    const timeStringLabel = convertTimeValueToString(
      convertSecondsToTimeValue(currentSeconds)
    );
    let pomoStateLabel = 'Focus';
    if (currentPomoState === 'long-break') {
      pomoStateLabel = 'Long break';
    } else if (currentPomoState === 'short-break') {
      pomoStateLabel = 'Short break';
    }

    const tabLabel = `[${timeStringLabel}] ${pomoStateLabel}`;
    changeTabTitle(tabLabel);
  }, [currentSeconds, currentPomoState]);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [defaultSettingFocus, setDefaultSettingFocus] =
    useState<SettingField | null>(null);

  const closeSettings = () => {
    setIsSettingsOpen(false);
    setDefaultSettingFocus(null);
  };

  const openSettings = (field: SettingField) => {
    setDefaultSettingFocus(field);
    setIsSettingsOpen(true);
  };

  const palette = useMemo(
    () => getPomoColorPalette(currentPomoState),
    [currentPomoState]
  );

  return (
    <>
      {isSettingsOpen && (
        <PomoSettingsModal
          isSettingsOpen={isSettingsOpen}
          closeSettings={closeSettings}
          defaultSettingFocus={defaultSettingFocus}
          pomodoroTimer={pomodoroTimer}
          pomodoroTotalMinutes={secondsToMinutes(pomodoroTotalSeconds)}
          shortBreakTotalMinutes={secondsToMinutes(shortBreakTotalSeconds)}
          longBreakTotalMinutes={secondsToMinutes(longBreakTotalSeconds)}
          isAutoStartEnabled={isAutoStartEnabled}
          palette={palette}
        />
      )}
      <ContentBox
        title="Pomodoro Timer"
        style={{
          backgroundColor: palette.base,
        }}
      >
        <div className={styles.pomoContainer}>
          <FlowTracker
            pomodoroTimer={pomodoroTimer}
            currentPomoState={currentPomoState}
            pomoFlowInfo={pomoFlowInfo}
            palette={palette}
          />
          <Timer
            pomodoroTimer={pomodoroTimer}
            currentSeconds={currentSeconds}
            currentTimerState={currentTimerState}
            palette={palette}
          />
          <TimerProgress
            percentage={
              ((totalSecondsOfCurrentPomoState - currentSeconds) /
                totalSecondsOfCurrentPomoState) *
              100
            }
            palette={palette}
          />
        </div>
      </ContentBox>
      <ContentBox
        title="Settings"
        style={{
          backgroundColor: palette.base,
        }}
      >
        <div className={styles.settingContainer}>
          <PomoSettings
            openSettings={openSettings}
            pomodoroTotalMinutes={secondsToMinutes(pomodoroTotalSeconds)}
            shortBreakTotalMinutes={secondsToMinutes(shortBreakTotalSeconds)}
            longBreakTotalMinutes={secondsToMinutes(longBreakTotalSeconds)}
            isAutoStartEnabled={isAutoStartEnabled}
            palette={palette}
          />
        </div>
      </ContentBox>
    </>
  );
};

export default Pomodoro;
