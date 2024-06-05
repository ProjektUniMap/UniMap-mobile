import React, { useState } from 'react';
import Mapbox, {
  ShapeSource,
  SymbolLayer,
  LineLayer,
  MapView,
  FillLayer,
} from '@rnmapbox/maps';
import { FeatureCollection, Feature } from 'geojson';

interface MapSourceProps {
  selectedLevel: string;
  minZoomLevel: number;
  shape: FeatureCollection | undefined;
  selectedRoomId: Number | undefined;
  setSelectedRoomId: React.Dispatch<React.SetStateAction<Number | undefined>>;
}

const MapSource = ({
  selectedLevel,
  minZoomLevel,
  shape,
  selectedRoomId,
  setSelectedRoomId,
}: MapSourceProps) => {
  return (
    <ShapeSource
      id="indoor"
      shape={shape}
      onPress={(p) => {
        if (selectedRoomId === p.features[0].properties?.id) {
          setSelectedRoomId(-1);
          return;
        }
        setSelectedRoomId(p.features[0].properties?.id as Number);
      }}
    >
      <FillLayer
        id="indoor-fill"
        style={{
          fillColor: [
            'match',
            ['string', ['get', 'indoor']],
            'corridor',
            '#FDFCFA',
            '#FEFEE2',
          ],
        }}
        filter={['==', 'level', selectedLevel]}
        minZoomLevel={minZoomLevel}
      />
      <LineLayer
        id="indoor-line"
        style={{ lineColor: '#000' }}
        filter={['==', 'level', selectedLevel]}
        minZoomLevel={minZoomLevel}
      />
      <LineLayer
        id="highlight"
        style={{ lineColor: '#00F', lineWidth: 3 }}
        filter={['==', 'id', selectedRoomId]}
        minZoomLevel={minZoomLevel}
      />
      <SymbolLayer
        id="indoor-text"
        style={{
          symbolPlacement: 'point',
          textField: ['get', 'name'],
          textSize: 8,
        }}
        filter={['==', 'level', selectedLevel]}
        minZoomLevel={minZoomLevel}
      />
    </ShapeSource>
  );
};

export default MapSource;
