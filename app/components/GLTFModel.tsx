import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const GLTFModel: React.FC<{
  modelPath: string;
  onClick: (mesh: THREE.Mesh) => void;
}> = ({ modelPath, onClick }) => {
  const gltf = useLoader(GLTFLoader, "/models/model.gltf");
  const { scene } = useGLTF(modelPath);

  // マウスクリック時に透過処理を行う
  const handleClick = (event: any) => {
    const intersected = event.intersections[0];
    if (intersected) {
      onClick(intersected.object);
    }
  };

  return <primitive object={gltf.scene} onClick={handleClick} />;
};

const ModelViewer: React.FC<{ modelPath: string }> = ({ modelPath }) => {
  const modelRef = useRef<THREE.Group>(null);
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // マウスクリックでメッシュの透過を変更
  const handleMeshClick = (mesh: THREE.Mesh) => {
    const originalOpacity = mesh.material.opacity;
    mesh.material.transparent = true;
    mesh.material.opacity = originalOpacity === 1 ? 0.5 : 1; // 透過切替
  };

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <GLTFModel modelPath={modelPath} onClick={handleMeshClick} />
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
};

export default ModelViewer;
