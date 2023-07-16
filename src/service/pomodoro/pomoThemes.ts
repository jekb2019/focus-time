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
        base: '#D9CCFF',
        accent: '#9980ed',
      };
    case 'long-break':
      return {
        base: '#A5D9C4',
        accent: '#389D74',
      };
  }
};
