"use client";

import ThreeScene from "@/app/components/threeScene2";
import ModelViewer from "@/app/components/GLTFModel";
import styles from "@/app/view/style.module.css";

export default function Home() {
  const file = "@/app/view/assets/2CylinderEngine.gltf";
  return (
    <div>
      <h2>3D表示</h2>
      <div className={styles.overlay}>
        <ThreeScene filrPath={file} />
      </div>
    </div>
  );
}
