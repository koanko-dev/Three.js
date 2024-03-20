/* eslint-disable react/no-unknown-property */
import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

const GLBModel = () => {
  const ref = useRef(null);
  const [currentAnimation, setCurrentAnimation] = useState("wave");

  const { scene, animations } = useGLTF("/dancer.glb");
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    actions[currentAnimation].fadeIn(2).play();

    return () => {
      actions[currentAnimation].fadeOut(2).stop();
    };
  }, [actions, currentAnimation]);

  return (
    <primitive
      ref={ref}
      object={scene}
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
    />
  );
};

export default GLBModel;
