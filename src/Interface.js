import React, { useRef, useEffect, useState } from 'react';
import { useKeyboardControls } from '@react-three/drei';
import useGame from './hooks/useGame.js';
import { addEffect } from '@react-three/fiber';
import { useAudio } from './hooks/useAudio.js';
import UseAnimations from 'react-useanimations';
import volume from 'react-useanimations/lib/volume';

export default function Interface() {
  const time = useRef();
  const start = useGame((state) => state.start);
  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);
  const audio = useAudio((state) => state.audio);
  const toggleAudio = useAudio((state) => state.toggleAudio);
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const left = useKeyboardControls((state) => state.left);
  const right = useKeyboardControls((state) => state.right);
  const jump = useKeyboardControls((state) => state.jump);

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();

      let elapsedTime = 0;

      if (state.phase === 'playing') {
        elapsedTime = Date.now() - state.startTime;
      } else if (state.phase === 'ended') {
        elapsedTime = state.endTime - state.startTime;
      }
      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);

      if (time.current) {
        time.current.textContent = elapsedTime;
      }
    });
    return () => {
      unsubscribeEffect();
    };
  }, []);

  function handleToggleAudio(e) {
    toggleAudio();
    e.target.blur();
  }

  return (
    <>
      <div className="interface">
        <button className="audio-toggle" onClick={handleToggleAudio}>
          <UseAnimations animation={volume} reverse={!audio} strokeColor="white" />
        </button>

        <div className="time" ref={time}>
          0.00
        </div>

        {phase === 'ready' && (
          <h2 className="start" onClick={start}>
            Play
          </h2>
        )}

        {phase === 'ended' && (
          <div className="restart" onClick={restart}>
            restart
          </div>
        )}

        <div className="controls">
          <div className="raw">
            <div className={`key ${forward ? 'active' : ''}`}></div>
          </div>
          <div className="raw">
            <div className={`key ${left ? 'active' : ''}`}></div>
            <div className={`key ${backward ? 'active' : ''}`}></div>
            <div className={`key ${right ? 'active' : ''}`}></div>
          </div>
          <div className="raw">
            <div className={`key large ${jump ? 'active' : ''}`}></div>
          </div>
        </div>
      </div>
    </>
  );
}
