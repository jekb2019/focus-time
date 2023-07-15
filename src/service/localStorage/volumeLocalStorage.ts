import { VolumeSettings } from '../pomodoro/types';
import { getLocalStorage, setLocalStorage } from './localStorage';
const VOLUME_SETTINGS_KEY = 'volume';

export function setVolumeSettingsToLocalStorage(
  volumeSettings: VolumeSettings
) {
  setLocalStorage(VOLUME_SETTINGS_KEY, JSON.stringify(volumeSettings));
}

export function getVolumeSettingsFromLocalStorage(): VolumeSettings | null {
  const result = getLocalStorage(VOLUME_SETTINGS_KEY);
  return result === null ? null : JSON.parse(result);
}
