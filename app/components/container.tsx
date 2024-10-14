"use client";

import { useSidenav } from "@/app/context/sidenavContext";
import styles from "@/app/components/container.module.css";

export default function Container({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isSidenavOpen } = useSidenav();

  return (
    <div className={isSidenavOpen ? styles.sidenavOpen : styles.sidenavClose}>
      {children}
    </div>
  );
}
