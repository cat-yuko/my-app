import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";

export default function ThreeScene2({filrPath}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, 2);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 1;
    controls.maxDistance = 10;

    const light = new THREE.AmbientLight(0xffffff, 2);
    scene.add(light);

    const loader = new GLTFLoader();
    loader.load(
      `http://localhost:8000/media/gltf/${filrPath}`,
      (gltf) => {
        scene.add(gltf.scene);
        setScene(scene);
        animate();
      }
    );

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    return () => {
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [filrPath]);

  const handleClick = (event: React.MouseEvent) => {
    if (!scene) return;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // マウス座標を -1 ～ 1 の範囲に変換
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const camera = scene.children.find(
      (obj) => obj instanceof THREE.PerspectiveCamera
    ) as THREE.Camera;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
      const object = intersects[0].object;
      if (object.material) {
        (object.material as THREE.Material).transparent = true;
        (object.material as THREE.Material).opacity = 0.5;
      }
    }
  };

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100vh" }}
      onClick={handleClick}
    />
  );
}
