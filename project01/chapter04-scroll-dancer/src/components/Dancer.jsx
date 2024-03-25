/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  Box,
  Circle,
  Points,
  useAnimations,
  useGLTF,
  useScroll,
  useTexture,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import * as THREE from "three";

import { IsEnteredAtom } from "../stores";
import Loader from "./Loader";

let timeline;
const colors = {
  boxMaterialColor: "#dc4f00",
};
const Dancer = () => {
  const three = useThree();
  const [currentAnimation, setCurrentAnimation] = useState("wave");
  const [rotateFinished, setRotateFinished] = useState(false);

  // useRecoilValue: isEntered 값만 사용
  const isEntered = useRecoilValue(IsEnteredAtom);
  const dancerRef = useRef(null);
  const boxRef = useRef(null);
  const starGroupRef01 = useRef(null);
  const starGroupRef02 = useRef(null);
  const starGroupRef03 = useRef(null);
  const reactAreaLightRef = useRef(null);
  const hemisphereLightRef = useRef(null);

  const { scene, animations } = useGLTF("/models/dancer.glb");
  const { actions } = useAnimations(animations, dancerRef);

  const texture = useTexture("/texture/5.png");

  const { positions } = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 1) {
      positions[i] = (Math.random() - 0.5) * 25;
    }

    return { positions };
  }, []);

  const scroll = useScroll();

  useFrame(() => {
    // scroll.offset => 현재 스크롤한 오프셋을 0~1 로 환산한 값
    console.log(scroll.offset);

    if (!isEntered) return;
    timeline.seek(scroll.offset * timeline.duration());
    // colors에 저장한 값으로 배경 색상을 가지게 하기
    boxRef.current.material.color = new THREE.Color(colors.boxMaterialColor);

    // 회전이 끝난 마지막에는 breakdancingEnd 애니메이션 실행
    if (rotateFinished) {
      setCurrentAnimation("breakdancingEnd");
    } else {
      setCurrentAnimation("wave");
    }
  });

  useEffect(() => {
    if (!isEntered) return;
    three.camera.lookAt(1, 2, 0);
    actions["wave"].play();
    three.scene.background = new THREE.Color(colors.boxMaterialColor);
    scene.traverse((obj) => {
      if (obj.isMesh) {
        obj.castShadow = true;
        obj.receiveShadow = true;
      }
    });
  }, [actions, isEntered, three.camera, three.scene, scene]);

  useEffect(() => {
    let timeout;
    if (currentAnimation === "wave") {
      actions[currentAnimation]?.reset().fadeIn(0.5).play();
    } else {
      actions[currentAnimation]
        ?.reset()
        .fadeIn(0.5)
        .play()
        .setLoop(THREE.LoopOnce, 1);

      timeout = setTimeout(() => {
        if (actions[currentAnimation]) {
          actions[currentAnimation].paused = true;
        }
      }, 8000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [actions, currentAnimation]);

  // 입장시 효과
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

    gsap.fromTo(
      colors,
      { boxMaterialColor: "#0c0400" },
      { duration: 2.5, boxMaterialColor: "#dc4f00" }
    );

    gsap.to(starGroupRef01.current, {
      yoyo: true, // 재생, 역재싱이 이어서 반복하는 것
      duration: 2,
      repeat: -1,
      ease: "linear",
      size: 0.05,
    });
    gsap.to(starGroupRef02.current, {
      yoyo: true,
      duration: 3,
      repeat: -1,
      ease: "linear",
      size: 0.05,
    });
    gsap.to(starGroupRef03.current, {
      yoyo: true,
      duration: 4,
      repeat: -1,
      ease: "linear",
      size: 0.05,
    });
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
        <primitive ref={dancerRef} object={scene} scale={0.05} />
        <ambientLight intensity={2} />
        <rectAreaLight
          ref={reactAreaLightRef}
          position={[0, 10, 0]}
          intensity={30}
        />
        <pointLight
          position={[0, 5, 0]}
          intensity={0}
          castShadow
          receiveShadow
        />
        <hemisphereLight
          ref={hemisphereLightRef}
          position={[0, 5, 0]}
          intensity={0}
          groundColor={"lime"}
          color={"blue"}
        />

        {/* 전체 배경 */}
        <Box ref={boxRef} args={[100, 100, 100]} position={[0, 0, 0]}>
          <meshStandardMaterial color={"#dc4f00"} side={THREE.DoubleSide} />
        </Box>

        {/* 원형 바닥 판 */}
        <Circle
          castShadow
          receiveShadow
          args={[8, 32]}
          rotation-x={-Math.PI / 2}
          position-y={-4.4}
        >
          <meshStandardMaterial color={"#dc4f00"} side={THREE.DoubleSide} />
        </Circle>

        <Points positions={positions.slice(0, positions.length / 3)}>
          <pointsMaterial
            ref={starGroupRef01}
            size={0.5}
            color={new THREE.Color("#dc4f00")}
            sizeAttenuation // 원근에 따라 크기를 조절
            depthWrite // 앞에 있는 것이 뒤에 있는 것을 가리게
            alphaMap={texture}
            transparent
            alphaTest={0.001}
          />
        </Points>
        <Points
          positions={positions.slice(
            positions.length / 3,
            (positions.length * 2) / 3
          )}
        >
          <pointsMaterial
            ref={starGroupRef02}
            size={0.5}
            color={new THREE.Color("#dc4f00")}
            sizeAttenuation // 원근에 따라 크기를 조절
            depthWrite // 앞에 있는 것이 뒤에 있는 것을 가리게
            alphaMap={texture}
            transparent
            alphaTest={0.001}
          />
        </Points>
        <Points positions={positions.slice((positions.length * 2) / 3)}>
          <pointsMaterial
            ref={starGroupRef03}
            size={0.5}
            color={new THREE.Color("#dc4f00")}
            sizeAttenuation // 원근에 따라 크기를 조절
            depthWrite // 앞에 있는 것이 뒤에 있는 것을 가리게
            alphaMap={texture}
            transparent
            alphaTest={0.001}
          />
        </Points>
      </>
    );
  }

  return <Loader isComplated />;
};

export default Dancer;
