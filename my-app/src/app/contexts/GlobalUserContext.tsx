'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

const GlobalUserContext = createContext<any>(null);

export const useGlobalUser = () => useContext(GlobalUserContext);

export const UserContext = ({ children }: { children: ReactNode }) => {
  const [Data, setData] = useState<string | null>(null);
  const [dataloading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("user");
    setData(storedToken)
    setLoading(false)
  }, []);


  return (
    <GlobalUserContext.Provider value={{ Data,dataloading }}>
      {children}
    </GlobalUserContext.Provider>
  );
};
