import React from 'react';
import { useKeyboardControls } from '@react-three/drei';

export default function Interface() {
  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const left = useKeyboardControls((state) => state.left);
  const right = useKeyboardControls((state) => state.right);
  const jump = useKeyboardControls((state) => state.jump);

  return (
    <div className="interface">
      Fuck your mother :p
      <div className="time">0.00</div>
      <div className="restart">restart</div>
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
  );
}
