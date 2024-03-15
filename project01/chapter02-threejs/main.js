import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
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
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.position.y = 0.5;
boxMesh.receiveShadow = true;
boxMesh.castShadow = true;
scene.add(boxMesh);

// Lights
// AmbientLight
const ambientLight = new THREE.AmbientLight(0xffffff, 5);
scene.add(ambientLight);

// DirectionalLight
const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.castShadow = true;
directionalLight.position.set(3, 4, 5);
directionalLight.lookAt(0, 0, 0);
scene.add(directionalLight);
// LightHelper: 눈으로 보기 어려운 라이트 요소에 보조선 같은 것들을 제공
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1)
scene.add(directionalLightHelper);

// HemisphereLight
const heimsphereLight = new THREE.HemisphereLight(0xb4a912, 0x12f34f, 5);
heimsphereLight.position.set(0, 1, 0);
heimsphereLight.lookAt(0, 0, 0);
scene.add(heimsphereLight);
const heimsphereLightHelper = new THREE.HemisphereLightHelper(heimsphereLight, 1)
scene.add(heimsphereLightHelper);

// PointLight
const pointLight = new THREE.PointLight(0xffffff, 5, 5, 4);
pointLight.castShadow = true;
pointLight.position.set(1, 1, 1);
scene.add(pointLight);
const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
scene.add(pointLightHelper);

// RectAreaLight
const rectAreaLight = new THREE.RectAreaLight(0xffffff, 5, 2, 2);
rectAreaLight.position.set(0, 1, 2);
scene.add(rectAreaLight);

// SpotLight
const spotLight = new THREE.SpotLight(0xffffff, 10, 100, Math.PI / 4, 1, 1);
spotLight.castShadow = true;
spotLight.position.set(0, 5, 0);
scene.add(spotLight);
// lookAt메서드 없음. target으로 바라볼 곳 설정해야 함
const targetObj = new THREE.Object3D();
scene.add(targetObj);
spotLight.target = targetObj;
spotLight.target.position.set(1, 0, 2);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);


// 화면을 컨트롤 할 수 있도록 만들기
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.update();

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
};

render();
