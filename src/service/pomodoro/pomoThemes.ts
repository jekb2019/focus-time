import { PomoState } from './types';

export type PomoPalette = {
  base: string;
  accent: string;
};
export const getPomoColorPalette = (pomoState: PomoState): PomoPalette => {
  switch (pomoState) {
    case 'pomodoro':
      return {
        base: '#FFC3AB',
        accent: '#ff6347',
      };
    case 'short-break':
      return {
        base: '#c2f28e',
        accent: '#3D6D40',
      };
    case 'long-break':
      return {
        base: '#A9D8FF',
        accent: '#1B4B8E',
      };
  }
};
