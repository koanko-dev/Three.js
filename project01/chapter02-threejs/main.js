import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.x = 5;
camera.position.y = 5;
camera.position.z = 5;

const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0xbbbbbb,
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
floor.castShadow = true;
scene.add(floor);

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.castShadow = true;
directionalLight.position.set(3, 4, 5);
directionalLight.lookAt(0, 0, 0);
directionalLight.shadow.mapSize.width = 4096;
directionalLight.shadow.mapSize.height = 4096;
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 100;
scene.add(directionalLight);

const gltfLoader = new GLTFLoader();
const data = await gltfLoader.loadAsync("/dancer.glb");
const character = data.scene;
console.log(data);
character.position.y = 0.8;
character.scale.set(0.01, 0.01, 0.01);
// children을 돌면서 실행. 그 안에서 속성값을 모두 변경할 때 사용하면 좋다.
character.traverse((obj) => {
  if (obj.isMesh) {
    obj.castShadow = true;
    obj.receiveShadow = true;
  }
});
scene.add(character);

const mixer = new THREE.AnimationMixer(character);
const animationClips = data.animations;
const action = mixer.clipAction(animationClips[3]);
// action.setLoop(THREE.LoopOnce); // 한번만 실행
action.setLoop(THREE.LoopRepeat); // default. 계속해서 반복해 실행
// action.setLoop(THREE.LoopPingPong); // 끝까지 실행되면 역재생되어 다시 돌아오는 걸 반복
// action.setDuration(10); // 애니메이션 속력
// action.setEffectiveTimeScale(2); // 애니메이션 속력 비율. 몇배속
// action.setEffectiveWeight(0.5); // 움직임을 정도. 춤이라면 덜 추거나 더 추거나를 조절
action.play();

// 애니메이션 멈추기
setTimeout(() => {
  action.paused = true;
}, 3000);

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.03;
orbitControls.enableZoom = true;
orbitControls.enablePan = true;
orbitControls.enableRotate = true;
orbitControls.autoRotate = false;
orbitControls.autoRotateSpeed = 1;
orbitControls.maxPolarAngle = Math.PI / 2;
orbitControls.minPolarAngle = Math.PI / 4;
orbitControls.maxAzimuthAngle = Math.PI / 2;
orbitControls.minAzimuthAngle = Math.PI / -2;

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
});

const clock = new THREE.Clock();

// requestAnimationFrame 사용
const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  orbitControls.update();

  if (mixer) {
    mixer.update(clock.getDelta());
  }
};

render();
