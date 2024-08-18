import React, { createContext, useState, ReactNode } from 'react';
import { LatLng } from 'react-native-maps';

interface Marker {
  coordinate: LatLng;
  name: string;
  description: string;
  imageUri?: string; // Optional image URI property
  contact: string;
}

interface MarkerContextType {
  markers: Marker[];
  addMarker: (marker: Marker) => void;
}

const MarkerContext = createContext<MarkerContextType | undefined>(undefined);

export const MarkerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [markers, setMarkers] = useState<Marker[]>([]);

  const addMarker = (marker: Marker) => {
    setMarkers([...markers, marker]);
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
