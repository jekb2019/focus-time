import { useState } from 'react';
import ContentBox from '../../../ContentBox/ContentBox';
import FlowTracker from '../FlowTracker/FlowTracker';
import PomoSettings from '../PomoSettings/PomoSettings';
import Timer from '../Timer/Timer';
import TimerProgress from '../TimerProgress/TimerProgress';
import styles from './Pomodoro.module.css';
import PomoSettingsModal from '../PomoSettingsModal/PomoSettingsModal';
import { SettingField } from '../../../../service/timer/types';

const Pomodoro = () => {
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
      <PomoSettingsModal
        isSettingsOpen={isSettingsOpen}
        closeSettings={closeSettings}
        defaultSettingFocus={defaultSettingFocus}
      />
      <ContentBox
        title="Pomodoro Timer"
        style={{
          backgroundColor: '#FFC3AB',
        }}
      >
        <div className={styles.pomoContainer}>
          <FlowTracker />
          <Timer />
          <TimerProgress />
        </div>
      </ContentBox>
      <ContentBox
        title="Settings"
        style={{
          backgroundColor: '#FFC3AB',
        }}
      >
        <div className={styles.settingContainer}>
          <PomoSettings openSettings={openSettings} />
        </div>
      </ContentBox>
    </>
  );
};

export default Pomodoro;
