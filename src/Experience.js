/* eslint-disable react/no-unknown-property */
import { OrbitControls, Sparkles, RandomizedLight } from '@react-three/drei';
import Lights from './Lights.js';
import { Level } from './Level.js';
import { Physics, Debug } from '@react-three/rapier';
import Player from './Player.js';
import useGame from './hooks/useGame.js';
import Effects from './Effects.js';

export default function Experience() {

  const blocksCount = useGame((state) => state.blocksCount);
  const blocksSeed = useGame((state) => state.blocksSeed);

  return (
    <>
      {/* <OrbitControls makeDefault /> */}
      <color args={['#000000']} attach="background" />
      <Physics>
        <Debug />
        <Lights />
        <Level count={blocksCount} seed={blocksSeed} />
        <Player />
      </Physics>
      <Sparkles />
      {/* <RandomizedLight /> */}
      {/* <Effects /> */}
    </>
  );
}
