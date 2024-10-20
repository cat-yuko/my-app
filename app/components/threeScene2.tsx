import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function ThreeScene2({ filrPath }: { filrPath: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    //camera.position.set(1, 1, 1);
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 50;
    camera.lookAt(new THREE.Vector3(0, 10, 0));

    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    // 平行光源を作成
    // 上から照らす
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // 横からテラス
    const directionalLight2 = new THREE.DirectionalLight(0xffffff);
    directionalLight2.position.set(1, 0, 1);
    scene.add(directionalLight2);

    const loader = new GLTFLoader();
    //loader.load(`http://localhost:8000/media/gltf/${filrPath}`, (gltf) => {
    loader.load(filrPath, (gltf) => {
      const model = gltf.scene;
      model.scale.set(30, 30, 30);
      scene.add(model);
      setScene(scene);
    });

    render();

    function render() {
      requestAnimationFrame(render);
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
