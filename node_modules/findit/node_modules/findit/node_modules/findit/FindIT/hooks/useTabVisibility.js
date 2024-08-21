// hooks/useTabVisibility.js
import { useContext, createContext, useState } from 'react';

const TabVisibilityContext = createContext();

export const TabVisibilityProvider = ({ children }) => {
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);

  return (
    <TabVisibilityContext.Provider value={{ isTabBarVisible, setIsTabBarVisible }}>
      {children}
    </TabVisibilityContext.Provider>
  );
};

export const useTabVisibility = () => {
  return useContext(TabVisibilityContext);
};
