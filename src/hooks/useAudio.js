import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export const useAudio = create(
  subscribeWithSelector((set) => ({
    audio: true,
    toggleAudio: () => set((state) => ({ audio: !state.audio })),
  }))
);

