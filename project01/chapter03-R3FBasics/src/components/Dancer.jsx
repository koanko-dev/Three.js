/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 public/dancer.glb -o src/components/Dancer.jsx 
*/

import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function Dancer(props) {
  const group = useRef();
  const [currentAnimation, setCurrentAnimation] = useState("wave");

  const { nodes, materials, animations } = useGLTF("/dancer.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions[currentAnimation].fadeIn(2).play();

    return () => {
      actions[currentAnimation].fadeOut(2).stop();
    };
  }, [actions, currentAnimation]);

  return (
    <group
      scale={0.01}
      position-y={0.8}
      onPointerUp={() => {
        console.log("up!");
      }}
      onPointerDown={() => {
        console.log("down!");
      }}
      onClick={() => {
        setCurrentAnimation((prev) => {
          if (prev === "wave") return "windmill";
          return "wave";
        });
      }}
      ref={group}
      {...props}
      dispose={null}
    >
      <group name="AuxScene">
        <group position={[0, -82.942, -1.295]}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            name="Ch03"
            geometry={nodes.Ch03.geometry}
            material={materials.Ch03_Body}
            skeleton={nodes.Ch03.skeleton}
            castShadow
            receiveShadow
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/dancer.glb");
