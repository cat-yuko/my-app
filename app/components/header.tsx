'use client';

import React from "react";
import { useSidenav } from '@/app/context/sidenavContext';
import {
  Menu as MenuIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import styles from '@/app/components/header.module.css'

export default function Header() {
  const { toggleSidenav, isSidenavOpen } = useSidenav();

  return (
    <header className={styles.header}>
      <button className={styles.icon_button} onClick={toggleSidenav}>
        { isSidenavOpen ? <CloseIcon /> : <MenuIcon /> }
      </button>
      <div className={styles.title}>My App</div>
    </header>
  );
};
