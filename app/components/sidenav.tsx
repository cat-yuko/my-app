"use client";

import React from "react";
import NavLinks from "@/app/components/sidenav-links";
import { useSidenav } from "@/app/context/sidenavContext";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "@/app/components/sidenav.module.css";

export default function Sidenav() {
  const { isSidenavOpen } = useSidenav();

  if (!isSidenavOpen) return null;

  return (
    <aside className={styles.nav}>
      <NavLinks />
      <form>
        <button className={styles.button}>
          <LogoutIcon />
          <div className={`${styles.hidden}`}>Sign Out</div>
        </button>
      </form>
    </aside>
  );
}
