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
import { secondsToMinutes } from '../../../../utils/time';

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
        />
      )}
      <ContentBox
        title="Pomodoro Timer"
        style={{
          backgroundColor: '#FFC3AB',
        }}
      >
        <div className={styles.pomoContainer}>
          <FlowTracker
            pomodoroTimer={pomodoroTimer}
            currentPomoState={currentPomoState}
            pomoFlowInfo={pomoFlowInfo}
          />
          <Timer
            pomodoroTimer={pomodoroTimer}
            currentSeconds={currentSeconds}
            currentTimerState={currentTimerState}
          />
          <TimerProgress
            percentage={
              ((totalSecondsOfCurrentPomoState - currentSeconds) /
                totalSecondsOfCurrentPomoState) *
              100
            }
          />
        </div>
      </ContentBox>
      <ContentBox
        title="Settings"
        style={{
          backgroundColor: '#FFC3AB',
        }}
      >
        <div className={styles.settingContainer}>
          <PomoSettings
            openSettings={openSettings}
            pomodoroTotalMinutes={secondsToMinutes(pomodoroTotalSeconds)}
            shortBreakTotalMinutes={secondsToMinutes(shortBreakTotalSeconds)}
            longBreakTotalMinutes={secondsToMinutes(longBreakTotalSeconds)}
            isAutoStartEnabled={isAutoStartEnabled}
          />
        </div>
      </ContentBox>
    </>
  );
};

export default Pomodoro;
