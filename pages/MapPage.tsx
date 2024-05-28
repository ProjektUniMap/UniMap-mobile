import React, { useState, useRef, useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import Mapbox, { MapView, Camera } from '@rnmapbox/maps';
import MapSource from './../components/MapSource';
import MapGeoJSON from './../assets/maps/labtekv.json';
import LabtekVIIIGeoJSON from './../assets/maps/labtekviii.json';
import { FeatureCollection, Feature } from 'geojson';
import LevelButtons from './../components/LevelButtons';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';
import { measure } from '../utils/geography';

const EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN = process.env
  .EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN as string;
Mapbox.setAccessToken(EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN);

const MapPage = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user);
      } else {
        Alert.alert('Error Accessing User');
      }
    });
  }, []);

  // MapGeoJSON first just contains the GeoJSON from labtekv.json
  // Push all available GeoJSON features into MapGeoJSON
  for (const feature of LabtekVIIIGeoJSON.features) {
    MapGeoJSON.features.push(feature);
  }

  const map = useRef<MapView>(null);
  const [levels, setLevels] = useState<string[]>([]);
  const [buildingFetchLoading, setBuildingFetchLoading] = useState(false);
  const [buildings, setBuildings] = useState<Array<Number>>([]);
  const [selectedLevel, setSelectedLevel] = useState('2');
  const [shape, setShape] = useState<FeatureCollection>(
    MapGeoJSON as unknown as FeatureCollection,
  );
  const minZoomLevel = 18.5;

  const fetchBuildingInScreen = async (state: Mapbox.MapState) => {
    const radius = measure(
      state.properties.bounds.ne[0],
      state.properties.bounds.ne[1],
      state.properties.bounds.sw[0],
      state.properties.bounds.sw[1],
    );

    // Mapbox Position yang pertama itu LATITUDE, yang kedua itu LONGITUDE
    const center_lat = state.properties.center[0];
    const center_lon = state.properties.center[1];

    if (buildingFetchLoading) return;
    setBuildingFetchLoading(true);

    const { data, error } = await supabase.rpc('get_nearby_buildings', {
      lon: center_lon,
      lat: center_lat,
      max_distance: radius,
    });

    setBuildingFetchLoading(false);
    // console.log(buildings);
    // console.log(levels);

    if (error) {
      console.error(error);
      return;
    } else if (data && data !== buildings) {
      setBuildings(data.map((b: any) => b.gid));
      setLevels([
        ...new Set(data.flatMap((item: any) => item.level_order)),
      ] as string[]);
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapView style={styles.map} ref={map} onMapIdle={fetchBuildingInScreen}>
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
