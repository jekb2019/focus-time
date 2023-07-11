import { PomoSettings } from '../pomodoro/types';
import { getLocalStorage, setLocalStorage } from './localStorage';

const POMO_SETTINGS_KEY = 'pomo-settings';

export function setPomodoroTimerSettingsToLocalStorage(settings: PomoSettings) {
  setLocalStorage(POMO_SETTINGS_KEY, JSON.stringify(settings));
}

export function getPomodoroTimerSettingsFromLocalStorage(): PomoSettings | null {
  const result = getLocalStorage(POMO_SETTINGS_KEY);
  return result === null ? null : JSON.parse(result);
}
