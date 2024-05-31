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
}

const MapSource = ({ selectedLevel, minZoomLevel, shape }: MapSourceProps) => {
  return (
    <ShapeSource id="indoor" shape={shape}>
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
