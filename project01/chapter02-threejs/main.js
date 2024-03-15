import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FlyControls } from "three/examples/jsm/controls/FlyControls";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
import { PointerLockControls } from "three/examples/jsm/controls/PointerLockControls";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";

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

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.position.y = 0.5;
boxMesh.receiveShadow = true;
boxMesh.castShadow = true;
scene.add(boxMesh);

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
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  1
);
scene.add(directionalLightHelper);

// // OrbitControls
// const orbitControls = new OrbitControls(camera, renderer.domElement);
// orbitControls.enableDamping = true; // default = false
// orbitControls.dampingFactor = 0.03; // default =  0.05. 작아질수록 오래 유지.
// orbitControls.enableZoom = true; // 줌 가능하도록. default = true
// orbitControls.enablePan = true; // 카메라의 위치 변경할 수 있도록. default = true
// orbitControls.enableRotate = true; // 카메라 회전할 수 있도록. default = true
// orbitControls.autoRotate = false; // 자동 회전하도록. default = false
// orbitControls.autoRotateSpeed = 1; // default = 2. 클수록 회전 속도 빠름
// // 드래그를 이용한 회전반경 조절
// orbitControls.maxPolarAngle = Math.PI / 2; // 수직방향으로 회전 가능한 각도. 끝점
// orbitControls.minPolarAngle = Math.PI / 4; // 수직방향으로 회전 시작할 각도. 시작점
// orbitControls.maxAzimuthAngle = Math.PI / 2; // 수평방향으로 회전 가능한 각도. 끝점
// orbitControls.minAzimuthAngle = Math.PI / -2; // 수평방향으로 회전 시작할 각도. 시작점

// // FlyControls
// const flyControls = new FlyControls(camera, renderer.domElement);
// flyControls.movementSpeed = 10; // wasd 키로 움직일때 카메라 이동속도
// flyControls.rollSpeed = Math.PI / 4; // 마우스 움질일 때 카메라의 회전 속도

// // FirstPersonControls
// camera.position.set(0, 1, 5)
// const firstPersonControls = new FirstPersonControls(
//   camera,
//   renderer.domElement
// );
// firstPersonControls.lookSpeed = 0.1; // 카메라의 회전 속도
// firstPersonControls.movementSpeed = 1; // 카메라의 이동 속도
// firstPersonControls.lookVertical = false; // 카메라 수직 이동 활성화. default = true

// const clock = new THREE.Clock();

// // PointerLockControls
// camera.position.set(0, 1, 5)
// const pointerLockControls = new PointerLockControls(
//   camera,
//   renderer.domElement
// );
// window.addEventListener("click", () => {
//   pointerLockControls.lock();
// });

// TrackballControls
const trackballControls = new TrackballControls(camera, renderer.domElement);
trackballControls.rotateSpeed = 2; // 회전하는 속도
trackballControls.zoomSpeed = 1.5; // 줌하는 속도
trackballControls.panSpeed = 0.5; // 회전하는 속도
trackballControls.noRotate = false; // 회전 허용F
trackballControls.noZoom = false; // 줌 허용
trackballControls.noPan = false; // 카메라 회전 허용
trackballControls.staticMoving = false; // 댐핑이 없는 움직임을 활성할지에 대한 여부
trackballControls.dynamicDampingFactor = 0.05; // 댐핑의 정도

// trackball의 타겟을 바꾸고 싶다면,
const target = new THREE.Mesh(
  new THREE.SphereGeometry(0.5),
  new THREE.MeshStandardMaterial({ color: 0x0000ff })
);
target.position.set(4, 0.5, 0);
scene.add(target);
trackballControls.target = target.position;

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
});

// requestAnimationFrame 사용
const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  // orbitControls.update();
  // flyControls.update(clock.getDelta());
  // firstPersonControls.update(clock.getDelta());
  trackballControls.update();
};

render();
