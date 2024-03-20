import { Plane, TorusKnot } from "@react-three/drei";

/* eslint-disable react/no-unknown-property */
const Meshes = () => {
  return (
    <>
      <Plane args={[40, 40]} receiveShadow rotation-x={-Math.PI / 2}>
        <meshStandardMaterial />
      </Plane>

      <TorusKnot
        args={[1, 0.2, 128, 128, 2, 3]}
        position={[3, 1.6, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={0xffff00}
          roughness={0.2}
          metalness={0.5}
          emissive={0xffff00}
          emissiveIntensity={2}
        />
      </TorusKnot>
    </>
  );
};

export default Meshes;
