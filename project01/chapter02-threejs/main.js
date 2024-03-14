import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// antialias 적용
const renderer = new THREE.WebGLRenderer({ antialias: true });
// 아래 속성이 true 여야 그림자 생김
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
camera.position.y = 1;
camera.position.z = 5;

// DirectionalLight 직사광선
// DirectionalLight 파라미터 => 색, 빛의 세기
const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
// castShadow: 빛이 그림자를 드리울 수 있게 해주는 속성
directionalLight.castShadow = true;
directionalLight.position.set(3, 4, 5);
// lookAt: 빛이 0, 0, 0을 보게 하는 것
directionalLight.lookAt(0, 0, 0);
scene.add(directionalLight);

const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xbbbbbb });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
// rotation 속성으로 자리를 잡아줘야 한다.
floor.rotation.x = -Math.PI / 2;
// receiveShadow: 그림자를 받을 수 있게 해주는 속성
floor.receiveShadow = true;
floor.castShadow = true;
scene.add(floor);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
mesh.position.y = 0.5;
mesh.castShadow = true;
mesh.receiveShadow = true;
scene.add(mesh);

const capsuleGeometry = new THREE.CapsuleGeometry(1, 2, 20, 30);
const capsuleMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
const capsuleMesh = new THREE.Mesh(capsuleGeometry, capsuleMaterial);
capsuleMesh.position.set(3, 2, 0);
capsuleMesh.receiveShadow = true;
capsuleMesh.castShadow = true;
scene.add(capsuleMesh);

const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2);
const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cylinderMesh = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinderMesh.position.set(-3, 1, 0);
cylinderMesh.receiveShadow = true;
cylinderMesh.castShadow = true;
scene.add(cylinderMesh);

const torusGeometry = new THREE.TorusGeometry(0.6, 0.2, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const torusMesh = new THREE.Mesh(torusGeometry, torusMaterial);
torusMesh.position.set(2, 0.8, 2);
torusMesh.receiveShadow = true;
torusMesh.castShadow = true;
scene.add(torusMesh);

const starShape = new THREE.Shape();
starShape.moveTo(0, 1);
starShape.lineTo(0.2, 0.2);
starShape.lineTo(1, 0.2);
starShape.lineTo(0.3, -0.1);
starShape.lineTo(0.6, -1);
starShape.lineTo(0, -0.4);
starShape.lineTo(-0.6, -1);
starShape.lineTo(-0.3, -0.1);
starShape.lineTo(-1, 0.2);
starShape.lineTo(-0.2, 0.2);
const shapeGeometry = new THREE.ShapeGeometry(starShape);
const shapeMaterial = new THREE.MeshStandardMaterial({ color: 0xff00ff });
const shapeMesh = new THREE.Mesh(shapeGeometry, shapeMaterial);
shapeMesh.position.set(-2, 1, 2);
scene.add(shapeMesh);

const extrudeSettings = {
  steps: 1, // 값이 클수록 부드러운 형태가 되는 속성
  depth: 0.1, // 입체로 만드는 두께
  bevelEnabled: true, // 모서리를 둥글게 할지 여부
  bevelTickness: 0.1, // 모서리의 두께를 0.1
  bevelSize: 0.3, // 모서리의 크기
  bevelSegments: 100, // 모서리를 매끄럽게 하는 값
};
const extrudeGeometry = new THREE.ExtrudeGeometry(starShape, extrudeSettings);
const extrudeMaterial = new THREE.MeshStandardMaterial({ color: 0x0ddaaf });
const extrudeMesh = new THREE.Mesh(extrudeGeometry, extrudeMaterial);
extrudeMesh.position.set(-5, 1.3, 2);
extrudeMesh.castShadow = true;
extrudeMesh.receiveShadow = true;
scene.add(extrudeMesh);

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x98aaf });
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphereMesh.position.set(0, 1, -3);
sphereMesh.castShadow = true;
sphereMesh.receiveShadow = true;
scene.add(sphereMesh);

const numPoints = 1000;
const positons = new Float32Array(numPoints * 3);
for (let i = 0; i < numPoints; i += 1) {
  const x = (Math.random() - 0.5) * 1;
  const y = (Math.random() - 0.5) * 1;
  const z = (Math.random() - 0.5) * 1;
  positons[i * 3] = x;
  positons[i * 3 + 1] = y;
  positons[i * 3 + 2] = z;
}
const bufferGeometry = new THREE.BufferGeometry();
bufferGeometry.setAttribute("position", new THREE.BufferAttribute(positons, 3));
const pointsMaterial = new THREE.PointsMaterial({
  color: 0xffff00,
  size: 0.05,
});
const point = new THREE.Points(bufferGeometry, pointsMaterial);
point.position.set(-3, 1, -5);
scene.add(point);

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.update();

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
});

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

render();
