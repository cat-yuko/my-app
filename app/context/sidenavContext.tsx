"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// コンテキストの型定義
interface SidenavContextType {
  isSidenavOpen: boolean;
  toggleSidenav: () => void;
}

// デフォルト値を設定
const defaultContextValue: SidenavContextType = {
  isSidenavOpen: false,
  toggleSidenav: () => {},
};

const SidenavContext = createContext<SidenavContextType>(defaultContextValue);

export const SidenavProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isSidenavOpen, setIsSidenavOpen] = useState<boolean>(false);

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
