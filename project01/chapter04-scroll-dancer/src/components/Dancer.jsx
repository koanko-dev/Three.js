/* eslint-disable react/no-unknown-property */
import { useAnimations, useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { IsEnteredAtom } from "../stores";
import Loader from "./Loader";

const Dancer = () => {
    // useRecoilValue: isEntered 값만 사용
  const isEntered = useRecoilValue(IsEnteredAtom);
  const dancerRef = useRef(null);
  const { scene, animations } = useGLTF("/models/dancer.glb");

  const { actions } = useAnimations(animations, dancerRef);

  const scroll = useScroll();

  useFrame(() => {
    // scroll.offset => 현재 스크롤한 오프셋을 0~1 로 환산한 값
    console.log(scroll.offset);
  });

  useEffect(() => {
    if (isEntered) {
      actions["wave"].play();
    }
  }, [actions, isEntered]);

  if (isEntered) {
    return (
      <>
        <ambientLight intensity={2} />
        <primitive ref={dancerRef} object={scene} scale={0.05} />
      </>
    );
  }

  return <Loader isComplated />;
};

export default Dancer;
