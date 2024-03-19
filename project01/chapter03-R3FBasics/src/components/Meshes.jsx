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
        position={[-3, 1.6, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={0xff0000} />
      </TorusKnot>
    </>
  );
};

export default Meshes;
