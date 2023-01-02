/* eslint-disable react/no-unknown-property */
import { OrbitControls, Sparkles, RandomizedLight } from '@react-three/drei';
import Lights from './Lights.js';
import { Level } from './Level.js';
import { Physics, Debug } from '@react-three/rapier';
import Player from './Player.js';
import useGame from './hooks/useGame.js';
import Effects from './Effects.js';
import { useState } from 'react';

export default function Experience() {
  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);

  const [chiptune] = useState(() => new Audio('/kim-lightyear-angel-eyes-chiptune-edit.mp3'));

  const SoundTrack = () => {
    chiptune.currentTime = 0;
    chiptune.volume = 0.2;
    chiptune.play();
  };

  return (
    <>
      {/* <OrbitControls makeDefault /> */}
      <SoundTrack />
      <color args={['#000000']} attach="background" />
      <Physics>
        {/* <Debug /> */}
        <Lights />
        <Level count={blocksCount} seed={blocksSeed} />
        <Player />
      </Physics>
      <Sparkles 
        size={16}
        scale={[5, 2, blocksCount * 4]}
        position={[0, 1, -blocksCount * 2]}
        color="#f9fbb2"
        intensity={5}
      />
      <RandomizedLight />
      {/* <Effects /> */}
    </>
  );
}
