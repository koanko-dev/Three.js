/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Color } from "three";
import * as THREE from "three";

import Meshes from "./Meshes";
import Lights from "./Lights";

const MainCanvas = () => {
  return (
    <Canvas
      gl={{ antialias: true }}
      //   shadows={"soft"}
      shadows={{ enabled: true, type: THREE.PCFShadowMap }}
      camera={{
        fov: 60,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 100,
        position: [5, 5, 5],
      }}
      scene={{ background: new Color(0x000000) }}
    >
      <OrbitControls />
      <Lights />

      <Meshes />
    </Canvas>
  );
};

export default MainCanvas;
