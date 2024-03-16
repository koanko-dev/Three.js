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
floor.name = "FLOOR";
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
action.setLoop(THREE.LoopPingPong); // 끝까지 실행되면 역재생되어 다시 돌아오는 걸 반복
action.play();

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.enableDamping = true;
orbitControls.dampingFactor = 0.03;

const newPosition = new THREE.Vector3(0, 1, 0);
const rayCaster = new THREE.Raycaster();

renderer.domElement.addEventListener("pointerdown", (e) => {
  const x = (e.clientX / window.innerWidth) * 2 - 1;
  const y = -((e.clientY / window.innerHeight) * 2 - 1);
  // rayCaster 스크린에 쏠 준비
  rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);
  // scene에 있는 children을 한정으로 관통을 하겠다는 의미
  const intersects = rayCaster.intersectObjects(scene.children);

  const intersectFloor = intersects.find((i) => i.object.name === "FLOOR");
  console.log("interesctFloor", intersectFloor);
  // copy: 파라미터 값을 복사해서 넣어주겠다는 의미
  newPosition.copy(intersectFloor.point);
  newPosition.y = 1;
});

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
});

const clock = new THREE.Clock();
const targetVector = new THREE.Vector3();

const render = () => {
  // 캐릭터가 클릭한 곳을 보도록 설정
  character.lookAt(newPosition);
  // 경로 생성
  targetVector
    .subVectors(newPosition, character.position) // newPosition과 캐릭터의 position을 뺀 벡터를 할당해주고
    .normalize() // 그 벡터를 정규화(1로 만들어주는 작업)를 한다.
    .multiplyScalar(0.01); // 방향은 바꾸지 않고 크기만 0.01배
  // 경로대로 움직이게 만들기
  if (
    Math.abs(character.position.x - newPosition.x) >= 1 ||
    Math.abs(character.position.z - newPosition.z) >= 1
  ) {
    character.position.x += targetVector.x;
    character.position.z += targetVector.z;
    action.stop();
  }
  action.play();

  renderer.render(scene, camera);
  requestAnimationFrame(render);
  orbitControls.update();

  if (mixer) {
    mixer.update(clock.getDelta());
  }
};

render();
