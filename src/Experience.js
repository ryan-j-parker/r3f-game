/* eslint-disable react/no-unknown-property */
import { OrbitControls } from '@react-three/drei';
import Lights from './Lights.js';
import { Level } from './Level.js';
import { Physics, Debug } from '@react-three/rapier';
import Player from './Player.js';

export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault />
      <Physics>
        <Debug />
        <Lights />
        <Level />
        <Player />
      </Physics>
    </>
  );
}
