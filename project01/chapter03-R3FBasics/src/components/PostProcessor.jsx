import {
  Bloom,
  BrightnessContrast,
  DotScreen,
  EffectComposer,
  Glitch,
  Grid,
  HueSaturation,
  Pixelation,
  Sepia,
} from "@react-three/postprocessing";

const PostProcessor = () => {
  return (
    <EffectComposer>

      <Bloom
        intensity={0.5}
        mipmapBlur
        luminanceThreshold={1} // 밝기가 이 값보다 높은 것만 효과주기
        luminanceSmoothing={0.02} // 블룸효과를 부드럽게
      />

      <BrightnessContrast brightness={-0.2} contrast={0.8} />

      <DotScreen angle={Math.PI / 6} scale={100} />

      <Glitch
        delay={[1.5, 3.5]} // 글리치가 일어나지 않고 대기하는 시간 최소, 최대값
        duration={[0.5, 1.0]} // 글리치가 일어나는 시간 최소, 최대값
        strength={[0.01, 0.1]} // 글리치 강도 최소, 최대값
        ratio={0.5} // 강한 강도가 일어나는 글리치의 비율
      />

      <Grid scale={0.1} lineWidth={0.05} />

      <HueSaturation hue={Math.PI / 2} saturation={0.4} />

      <Pixelation granularity={5}/>

      <Sepia intensity={0.5}/>

    </EffectComposer>
  );
};

export default PostProcessor;
