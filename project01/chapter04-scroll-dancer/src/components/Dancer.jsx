/* eslint-disable react/no-unknown-property */
import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { useAnimations, useGLTF, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";

import { IsEnteredAtom } from "../stores";
import Loader from "./Loader";

let timeline;
const Dancer = () => {
  const three = useThree();

  // useRecoilValue: isEntered 값만 사용
  const isEntered = useRecoilValue(IsEnteredAtom);
  const dancerRef = useRef(null);
  const { scene, animations } = useGLTF("/models/dancer.glb");

  const { actions } = useAnimations(animations, dancerRef);

  const scroll = useScroll();

  useFrame(() => {
    // scroll.offset => 현재 스크롤한 오프셋을 0~1 로 환산한 값
    console.log(scroll.offset);

    if (!isEntered) return;
    timeline.seek(scroll.offset * timeline.duration());
  });

  useEffect(() => {
    if (!isEntered) return;
    actions["wave"].play();
  }, [actions, isEntered]);

  useEffect(() => {
    if (!isEntered) return;
    if (!dancerRef.current) return;
    gsap.fromTo(
      three.camera.position,
      {
        x: -5,
        y: 5,
        z: 5,
      },
      {
        x: 0,
        y: 6,
        z: 12,
        duration: 2.5,
      }
    );
    gsap.fromTo(
      three.camera.rotation,
      {
        z: Math.PI,
      },
      {
        z: 0,
        duration: 2.5,
      }
    );
  }, [isEntered, three.camera.position, three.camera.rotation]);

  useEffect(() => {
    if (!isEntered) return;
    if (!dancerRef.current) return;

    timeline = gsap.timeline();
    // 타임라인의 0.5 위치에서 이런 애니메이션 실행
    timeline
      .from(
        dancerRef.current.rotation,
        {
          duration: 4,
          y: -4 * Math.PI,
        },
        0.5
      )
      // 앞의 애니메이션과 동일한 시점에 실행
      // 3의 위치에서 시작해, 0으로 돌아옴
      .from(
        dancerRef.current.position,
        {
          duration: 4,
          x: 3,
        },
        "<"
      )
      .to(
        three.camera.position,
        {
          duration: 10,
          x: 2,
          z: 8,
        },
        "<"
      )
      // 앞의 3개 애니메이션 끝난 뒤 실행
      .to(three.camera.position, {
        duration: 10,
        x: 0,
        z: 6,
      })
      .to(three.camera.position, {
        duration: 10,
        x: 0,
        z: 16,
      });
  }, [isEntered, three.camera.position]);

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
