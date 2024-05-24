import React, { useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Mapbox, { MapView, Camera } from '@rnmapbox/maps';
import MapSource from './../components/MapSource';
import MapGeoJSON from './../assets/maps/labtekv.json';
import LabtekVIIIGeoJSON from './../assets/maps/labtekviii.json';
import { FeatureCollection, Feature } from 'geojson';
import LevelButtons from './../components/LevelButtons';

const MapPage = () => {
    const EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN = process.env
      .EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN as string;
    Mapbox.setAccessToken(EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN);
  
    // MapGeoJSON first just contains the GeoJSON from labtekv.json
    // Push all available GeoJSON features into MapGeoJSON
    // for (const feature of LabtekVIIIGeoJSON.features) {
    //   MapGeoJSON.features.push(feature);
    // }
  
    const map = useRef<MapView>(null);
    const [levels, setLevels] = useState<string[]>([]);
    const [selectedLevel, setSelectedLevel] = useState('2');
    const [shape, setShape] = useState<FeatureCollection>(
      MapGeoJSON as unknown as FeatureCollection,
    );
    const minZoomLevel = 18.5;
  
    const getAvailableLevels = async (state: Mapbox.MapState) => {
      const features = (await map.current?.querySourceFeatures('indoor'))
        ?.features;
      const currentLevels: string[] = [];
  
      features?.forEach((feature: Feature) => {
        if (
          !currentLevels.includes(feature.properties?.level) &&
          feature.properties?.level !== undefined
        ) {
          currentLevels.push(feature.properties?.level);
        }
      });
  
      setLevels(currentLevels);
    };
  
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          {/* <SignUpPage /> */}
          <MapView style={styles.map} ref={map} onMapIdle={getAvailableLevels}>
                      <Camera
                          zoomLevel={19}
                          pitch={20}
                          heading={10}
                          centerCoordinate={[107.60978612852416, -6.890546482705507]}
                      />
                      <MapSource
                          selectedLevel={selectedLevel}
                          minZoomLevel={minZoomLevel}
                          shape={shape}
                      />
                  </MapView>
        </View>
        {levels.length > 0 && (
                  <View style={styles.levelButtons}>
                      <LevelButtons
                          levels={levels}
                          selectedLevel={selectedLevel}
                          setSelectedLevel={setSelectedLevel}
                      />
                  </View>
              )}
      </View>
    );
  };
  
const styles = StyleSheet.create({
    page: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      height: '100%',
      width: '100%',
    },
    map: {
      flex: 1,
    },
    levelButtons: {
      position: 'absolute',
      bottom: 10,
      right: 10,
    },
  });

export default MapPage;
  