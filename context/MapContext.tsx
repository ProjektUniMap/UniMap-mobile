import { Camera } from '@rnmapbox/maps';
import { CameraRef } from '@rnmapbox/maps/lib/typescript/src/components/Camera';
import { createContext, useContext, useRef } from 'react';

interface MapContextProps {
  camera: React.RefObject<CameraRef>;
  moveCamera: ([lon, lat]: [number, number]) => void;
}

const MapContext = createContext<MapContextProps | undefined>(undefined);

export const useMap = () => {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMap must be used within a MapProvider');
  }
  return context;
};

export const MapProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const camera = useRef<Camera>(null);

  const moveCamera = ([lon, lat]: [number, number]) => {
    if (camera.current) console.log('HEY');
    camera.current?.setCamera({
      centerCoordinate: [lon, lat],
      animationDuration: 2000,
      animationMode: 'easeTo',
      zoomLevel: 20,
    });
  };

  return (
    <MapContext.Provider value={{ camera, moveCamera }}>
      {children}
    </MapContext.Provider>
  );
};
