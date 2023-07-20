import clickSoundUrl from '../../assets/sounds/click.wav';
import goalSoundUrl from '../../assets/sounds/goal.wav';
import { InvalidVolumeLevelError } from './errors';
import { SoundName } from './types';

export const DEFAULT_VOLUME = 0.5;

export interface SoundPlayer {
  playSound(soundName: SoundName): void;
  setVolume(soundName: SoundName, volumnLevel: number): void;
  setAllVolumes(volumeLevel: number): void;
  getVolume(): number;
}

export class SoundPlayerImpl implements SoundPlayer {
  private volume: number;
  private clickSound;
  private goalSound;

  constructor(volume: number) {
    this.volume = volume;
    this.clickSound = new Audio(clickSoundUrl);
    this.goalSound = new Audio(goalSoundUrl);

    this.clickSound.volume = this.volume;
    this.goalSound.volume = this.volume;
  }

  setAllVolumes(volumeLevel: number) {
    this.volume = volumeLevel;
    this.setVolume('click', this.volume);
    this.setVolume('goal', this.volume);
  }

  setVolume(soundName: SoundName, volumeLevel: number) {
    if (volumeLevel < 0 || volumeLevel > 1) {
      throw new InvalidVolumeLevelError('Volume level must be between 0 and 1');
    }

    switch (soundName) {
      case 'click':
        this.clickSound.volume = volumeLevel;
        break;
      case 'goal':
        this.goalSound.volume = volumeLevel;
    }
  }

  getVolume(): number {
    return this.volume;
  }

  playSound(soundName: SoundName) {
    switch (soundName) {
      case 'click':
        this.clickSound.play();
        break;
      case 'goal':
        this.goalSound.play();
        return;
    }
  }
}
