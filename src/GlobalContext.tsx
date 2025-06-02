import { createContext, useContext, ReactNode } from "react";

type GlobalContextType = {
  isEndpointsWorking: boolean; // Whether endpoints are functional
  role: string; // User role, e.g., "admin" or "user"
};

const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalProvider = ({
  children,
  isEndpointsWorking,
  role,
}: {
  children: ReactNode;
  isEndpointsWorking: boolean;
  role: string;
}) => {
  return (
    <GlobalContext.Provider value={{ isEndpointsWorking, role }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};