import React, { createContext, useState, ReactNode } from 'react';
import { LatLng } from 'react-native-maps';

interface MarkerContextType {
  markers: LatLng[];
  addMarker: (coordinate: LatLng) => void;
}

const MarkerContext = createContext<MarkerContextType | undefined>(undefined);

export const MarkerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [markers, setMarkers] = useState<LatLng[]>([]);

  const addMarker = (coordinate: LatLng) => {
    setMarkers([...markers, coordinate]);
  };

  return (
    <MarkerContext.Provider value={{ markers, addMarker }}>
      {children}
    </MarkerContext.Provider>
  );
};

export const useMarkers = () => {
  const context = React.useContext(MarkerContext);
  if (!context) {
    throw new Error('useMarkers must be used within a MarkerProvider');
  }
  return context;
};
