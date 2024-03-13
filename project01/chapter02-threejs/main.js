import "./style.css";
import * as THREE from "three";

const scene = new THREE.Scene();
// PerspectiveCamera params
const camera = new THREE.PerspectiveCamera(
  60, // 시야각
  window.innerWidth / window.innerHeight, // 가로 세로의 비율
  0.1, // near
  100 // far
);
camera.position.y = 1;
camera.position.z = 5;

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const renderer = new THREE.WebGLRenderer();
// 비율 맞추기 위해 렌더러 사이즈 조정
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 화면 크기가 중간에 바뀌어도
window.addEventListener("resize", () => {
  // 화면 비율 유지
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 카메라 비율 유지
  camera.aspect = window.innerWidth / window.innerHeight;
  // 카메라 속성이 변경되면 무조건 반드시 아래 메서드 실행하도록 하기
  camera.updateProjectionMatrix();
  renderer.render(scene, camera);
});

renderer.render(scene, camera);
