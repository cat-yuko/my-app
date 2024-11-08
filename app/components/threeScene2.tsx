import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function ThreeScene2({ filePath }: { filePath: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  // 元のopacityを保存
  const originalOpacityRef = useRef<number | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(1, 1, 1);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();

    const directionalLight1 = new THREE.DirectionalLight(0xffffff);
    directionalLight1.position.set(1, 1, 1);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff);
    directionalLight2.position.set(1, 0, 1);
    scene.add(directionalLight2);

    const loader = new GLTFLoader();
    loader.load(
      filePath,
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(30, 30, 30);
        scene.add(model);
        setScene(scene);

        // 初期opacityを保存
        const mesh = model.children.find(child => (child as THREE.Mesh).material) as THREE.Mesh;
        if (mesh && mesh.material) {
          const material = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
          originalOpacityRef.current = material.opacity; 
        }
      },
      undefined,
      (error) => {
        console.error("モデルの読み込み中にエラーが発生しました:", error);
      }
    );

    let animationId: number;
    const render = () => {
      animationId = requestAnimationFrame(render);
      controls.update();
      renderer.render(scene, camera);
    };
    render();

    const handleResize = () => {
      if (camera) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
      controls.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, [filePath]);

  const setMaterialTransparency = useCallback(
    (material: THREE.Material | THREE.Material[], opacity: number) => {
      if (Array.isArray(material)) {
        material.forEach((mat) => {
          mat.transparent = true;
          mat.opacity = opacity;
        });
      } else {
        material.transparent = true;
        material.opacity = opacity;
      }
    }, []
  );

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (!scene || !cameraRef.current|| originalOpacityRef.current === null) return;

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      // マウス座標を -1 ～ 1 の範囲に変換
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, cameraRef.current);

      const intersects = raycaster.intersectObjects(scene.children, true);
      if (intersects.length > 0) {
        const object = intersects[0].object as THREE.Mesh;
        if (object.material) {
          // 現在のopacity値に応じて0.5と1を切り替え
          const currentOpacity = Array.isArray(object.material)
            ? object.material[0].opacity
            : object.material.opacity;
          const newOpacity = currentOpacity === originalOpacityRef.current ? 0.5 : originalOpacityRef.current;
          setMaterialTransparency(object.material, newOpacity);
        }
      }
    },
    [scene, setMaterialTransparency]
  );

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100vh" }}
      onClick={handleClick}
    />
  );
}
