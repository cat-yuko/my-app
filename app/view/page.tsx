"use client";

import ThreeScene from "@/app/components/threeScene2";
import styles from "@/app/view/style.module.css";

export default function Home() {
  //const file = "/assets/2CylinderEngine.gltf";
  //const file = "/assets/Fox.glb";
  const file = "/assets/ToyCar/ToyCar.gltf";
  return (
    <div>
      <h2>3D表示</h2>
      <div className={styles.overlay}>
        <ThreeScene filrPath={file} />
      </div>
    </div>
  );
}
