'use client';

import React, { createContext, useContext, useState } from 'react';

const SidenavContext = createContext();

export const SidenavProvider = ({ children }) => {
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);

  const toggleSidenav = () => {
    setIsSidenavOpen((prev) => !prev);
  };

  return (
    <SidenavContext.Provider value={{ isSidenavOpen, toggleSidenav }}>
      {children}
    </SidenavContext.Provider>
  );
};

export const useSidenav = () => useContext(SidenavContext);
