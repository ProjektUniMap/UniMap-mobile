import { Camera, MapView } from '@rnmapbox/maps';
import { CameraRef } from '@rnmapbox/maps/lib/typescript/src/components/Camera';
import { createContext, useContext, useRef, useState } from 'react';

interface MapContextProps {
  map: React.RefObject<MapView>;
  camera: React.RefObject<CameraRef>;
  moveCamera: (
    [lon, lat]: [number, number],
    level: string,
    roomId: number,
  ) => void;
  selectedLevel: string;
  setSelectedLevel: React.Dispatch<React.SetStateAction<string>>;
  selectedRoomId: Number | undefined;
  setSelectedRoomId: React.Dispatch<React.SetStateAction<Number | undefined>>;
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
  const map = useRef<MapView>(null);
  const [selectedLevel, setSelectedLevel] = useState<string>('2');
  const [selectedRoomId, setSelectedRoomId] = useState<Number | undefined>(-1);

  const moveCamera = (
    [lon, lat]: [number, number],
    level: string,
    roomId: number,
  ) => {
    if (camera.current) console.log('HEY');
    camera.current?.setCamera({
      centerCoordinate: [lon, lat],
      animationDuration: 2000,
      animationMode: 'easeTo',
      zoomLevel: 20,
    });
    setSelectedLevel(level);
    setSelectedRoomId(roomId);
  };

  return (
    <MapContext.Provider
      value={{
        map,
        camera,
        moveCamera,
        selectedLevel,
        setSelectedLevel,
        selectedRoomId,
        setSelectedRoomId,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
