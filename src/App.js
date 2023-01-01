import './App.css';
import { Canvas } from '@react-three/fiber';
import Experience from './Experience.js';
import { KeyboardControls } from '@react-three/drei';
import Interface from './Interface';

function App() {
  return (
    <KeyboardControls
      map={[
        { name: 'forward', keys: ['KeyW', 'ArrowUp'] }, 
        { name: 'backward', keys: ['KeyS', 'ArrowDown'] }, 
        { name: 'left', keys: ['KeyA', 'ArrowLeft'] }, 
        { name: 'right', keys: ['KeyD', 'ArrowRight'] },
        { name: 'jump', keys: ['Space'] },
      ]}
    >
      <Canvas
        shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [2.5, 4, 6],
        }}
      >
        <Experience />
      </Canvas>
      <Interface />
    </KeyboardControls>
  );
}

export default App;
