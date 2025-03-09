import React, { createContext, useContext } from "react";

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContentProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const value = {
    backendUrl,
    // Add other app-specific state here if needed
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};