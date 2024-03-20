/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { Color } from "three";
import * as THREE from "three";

import Meshes from "./Meshes";
import Lights from "./Lights";
import Controls from "./Controls";
import GLBModel from "./GLBModel";
import { Dancer } from "./Dancer";

const MainCanvas = () => {
  return (
    <Canvas
      gl={{ antialias: true }}
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
      <Controls />
      <Lights />

      <Meshes />

      {/* <GLBModel /> */}
      <Dancer />
    </Canvas>
  );
};

export default MainCanvas;
