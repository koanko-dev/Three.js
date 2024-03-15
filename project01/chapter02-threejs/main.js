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

const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.castShadow = true;
directionalLight.position.set(3, 4, 5);
directionalLight.lookAt(0, 0, 0);
scene.add(directionalLight);

const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xbbbbbb });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
floor.castShadow = true;
scene.add(floor);

// Material
// FrontSide
const frontSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const frontSideMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ffff,
  side: THREE.FrontSide,
});
const frontSideMesh = new THREE.Mesh(frontSideGeometry, frontSideMaterial);
frontSideMesh.position.z = 4;
frontSideMesh.position.y = 0.5;
frontSideMesh.castShadow = true;
frontSideMesh.receiveShadow = true;
scene.add(frontSideMesh);

// BackSide
const backSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const backSideMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  side: THREE.BackSide,
});
const backSideMesh = new THREE.Mesh(backSideGeometry, backSideMaterial);
backSideMesh.position.set(2, 0.5, 4);
backSideMesh.position.y = 0.51;
// backSideMesh.castShadow = true;
backSideMesh.receiveShadow = true;
scene.add(backSideMesh);

// DoubleSide
const doubleSideGeometry = new THREE.BoxGeometry(1, 1, 1);
const doubleSideMaterial = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  side: THREE.DoubleSide,
});
const doubleSideMesh = new THREE.Mesh(doubleSideGeometry, doubleSideMaterial);
doubleSideMesh.position.set(4, 0.5, 4);
doubleSideMesh.position.y = 0.51;
// doubleSide는 castShadow와 receiveShadow를 둘 다 키면 정상작동하지 않는다.
// doubleSideMesh.castShadow = true;
doubleSideMesh.receiveShadow = true;
scene.add(doubleSideMesh);

// MeshStandardMaterial
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 20);
const torusKnotStandMaterial = new THREE.MeshStandardMaterial({
  color: 0xff0000,
});
torusKnotStandMaterial.roughness = 0.5;
torusKnotStandMaterial.metalness = 1;
const torusKnotStandardMesh = new THREE.Mesh(
  torusKnotGeometry,
  torusKnotStandMaterial
);
torusKnotStandardMesh.castShadow = true;
torusKnotStandardMesh.receiveShadow = true;
torusKnotStandardMesh.position.set(-4, 1, 0);
scene.add(torusKnotStandardMesh);

// MeshLambertMaterial
const torusKnotLamberMaterial = new THREE.MeshLambertMaterial({
  color: 0xff0000,
});
torusKnotLamberMaterial.emissive = new THREE.Color(0x00ff00); // 빛에 영향을 받지 않는 자체발광 색상
torusKnotLamberMaterial.emissiveIntensity = 0.2; // emissive의 세기
const torusKnotLamberMesh = new THREE.Mesh(
  torusKnotGeometry,
  torusKnotLamberMaterial
);
torusKnotLamberMesh.castShadow = true;
torusKnotLamberMesh.receiveShadow = true;
torusKnotLamberMesh.position.set(-2, 1, 0);
scene.add(torusKnotLamberMesh);

// MeshPhongMaterial
const torusKnotPhongMaterial = new THREE.MeshPhongMaterial({
  color: 0xff0000,
});
torusKnotPhongMaterial.emissive = new THREE.Color(0x00ff00);
torusKnotPhongMaterial.emissiveIntensity = 0.2;
torusKnotPhongMaterial.specular = new THREE.Color(0xf0ff0f); // 빛 받는 부분의 반사되는 색상
torusKnotPhongMaterial.shininess = 100; // specular의 세기
const torusKnotPhongMesh = new THREE.Mesh(
  torusKnotGeometry,
  torusKnotPhongMaterial
);
torusKnotPhongMesh.castShadow = true;
torusKnotPhongMesh.receiveShadow = true;
torusKnotPhongMesh.position.set(0, 1, 0);
scene.add(torusKnotPhongMesh);

// MeshBasicMaterial
const torusKnotBasicMaterial = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});
const torusKnotBasicMesh = new THREE.Mesh(
  torusKnotGeometry,
  torusKnotBasicMaterial
);
torusKnotBasicMesh.castShadow = true;
torusKnotBasicMesh.receiveShadow = true;
torusKnotBasicMesh.position.set(2, 1, 0);
scene.add(torusKnotBasicMesh);

// MeshDepthMaterial
const torusKnotDepthMaterial = new THREE.MeshDepthMaterial({
  color: 0xff0000,
});
torusKnotDepthMaterial.opacity = 0.5;
const torusKnotDepthMesh = new THREE.Mesh(
  torusKnotGeometry,
  torusKnotDepthMaterial
);
torusKnotDepthMesh.castShadow = true;
torusKnotDepthMesh.receiveShadow = true;
torusKnotDepthMesh.position.set(4, 1, 0);
scene.add(torusKnotDepthMesh);

// Load Texture
const textureLoader = new THREE.TextureLoader();
// textureLoader.load("/threejs.webp", (texture) => {
//   const textureBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
//   const textureMaterial = new THREE.MeshStandardMaterial({
//     map: texture,
//   });
//   const textureMesh = new THREE.Mesh(textureBoxGeometry, textureMaterial);
//   textureMesh.receiveShadow = true;
//   textureMesh.castShadow = true;
//   textureMesh.position.set(0, 0.5, 2);
//   scene.add(textureMesh);
// });
const texture = await textureLoader.loadAsync("/threejs.webp");
const textureBoxGeometry = new THREE.BoxGeometry(1, 1, 1);
const textureMaterial = new THREE.MeshStandardMaterial({
  map: texture,
});
const textureMesh = new THREE.Mesh(textureBoxGeometry, textureMaterial);
textureMesh.receiveShadow = true;
textureMesh.castShadow = true;
textureMesh.position.set(0, 0.5, 2);
scene.add(textureMesh);

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
