/* eslint-disable react/no-unknown-property */
import { useFrame } from '@react-three/fiber';
import { RigidBody, useRapier } from '@react-three/rapier';
import { useKeyboardControls } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function Player() {
  const [subscribeKeys, getKeys] = useKeyboardControls();
  //   console.log('subscribe', subscribeKeys);
  //   console.log('get', getKeys);
  const body = useRef();

  const { rapier, world } = useRapier();
  const rapierWorld = world.raw();

  const [smoothedCameraPosition] = useState(() => new THREE.Vector3(20, 20, 20));
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  console.log(world.raw);
  const jump = () => {
    const origin = body.current.translation();
    origin.y -= 0.31;

    const direction = { x: 0, y: -1, z: 0 };
    // console.log(origin);

    const ray = new rapier.Ray(origin, direction);
    const hit = rapierWorld.castRay(ray, 10, true);

    if (hit.toi < 0.15) {
      body.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
    }

    // body.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
  };

  useEffect(() => {
    const unsubscribeJump = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) {
          jump();
        }
      }
    );
    return () => {
      unsubscribeJump();
    };
  }, []);

  useFrame((state, delta) => {
    const { forward, backward, left, right, jump } = getKeys();
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }
    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }
    if (left) {
      impulse.x -= impulseStrength;
      torque.x += torqueStrength;
    }
    if (right) {
      impulse.x += impulseStrength;
      torque.x -= torqueStrength;
    }

    body.current.applyImpulse(impulse);
    body.current.applyTorqueImpulse(torque);

    const bodyPosition = body.current.translation();
    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(bodyPosition);
    cameraPosition.z += 2.25;
    cameraPosition.y += 0.65;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(bodyPosition);
    cameraTarget.y += 0.25;

    smoothedCameraPosition.lerp(cameraPosition, 0.1);
    smoothedCameraTarget.lerp(cameraTarget, 0.1);

    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedCameraTarget);
  });

  return (
    <>
      <RigidBody
        ref={body}
        position={[0, 1, 0]}
        colliders="ball"
        restitution={0.2}
        friction={1}
        angularDamping={0.5}
        linearDamping={0.5}
      >
        <mesh castShadow>
          <icosahedronGeometry args={[0.3, 1]} />
          <meshStandardMaterial flatShading color="#6369d1" />
        </mesh>
      </RigidBody>
    </>
  );
}
