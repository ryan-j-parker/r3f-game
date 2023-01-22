import { useEffect, useMemo } from 'react';
import { useAudio } from './hooks/useAudio';
import useGame from './hooks/useGame';

function SoundManager() {
  const audio = useAudio((state) => state.audio);
  const gamePhase = useGame((state) => state.phase);

  const successSound = useMemo(() => {
    const sound = new Audio('/victory.wav');
    sound.volume = 0.2;
    return sound;
  }, []);

  const backgroundSound = useMemo(() => {
    const sound = new Audio('/kim-lightyear-angel-eyes-chiptune-edit.mp3');
    sound.volume = 0.5;
    sound.loop = true;
    return sound;
  }, []);

  useEffect(() => {
    if (gamePhase === 'ready') {
      backgroundSound.volume = 0.05;
    }
    if (gamePhase === 'playing') {
      backgroundSound.volume = 0.05;
      backgroundSound.play();
    }
    if (gamePhase === 'ended') {
      backgroundSound.volume = 0.2;
      successSound.currentTime = 0;
      successSound.play();
    }
  }, [gamePhase]);

  useEffect(() => {
    backgroundSound.muted = !audio;
    successSound.muted = !audio;
  }, [audio]);

  return null;
}

export { SoundManager };
