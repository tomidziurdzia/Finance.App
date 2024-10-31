"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

interface SidebarContextType {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

export const SidebarContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [show, setShow] = useState(false);

  const value = useMemo(() => ({ show, setShow }), [show]);

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === null) {
    throw new Error(`useSidebar must be used within a SidebarContextProvider`);
  }
  return context;
};
