import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  Easing,
  Settings,
} from 'react-native';
import Mapbox, {
  MapView,
  Camera,
  Location,
  UserLocation,
  LocationPuck,
} from '@rnmapbox/maps';
import MapSource from './../components/MapSource';
import { FeatureCollection } from 'geojson';
import LevelButtons from './../components/LevelButtons';
import { measure } from '../utils/geography';
import SearchBar from '../components/SearchBar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../routes/app.route';
import { useMap } from '../context/MapContext';
import defaultGeoJSON from '../assets/maps/labtekv.json';
import { getGeoJSON, getNearbyBuildings } from '../api/map.api';
import DetailModal from '../components/DetailModal';
import SettingsModal from '../components/SettingsModal';

import * as ExpoLocation from 'expo-location';

const EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN = process.env
  .EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN as string;
Mapbox.setAccessToken(EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN);

type MapProps = NativeStackScreenProps<AppStackParamList, 'Map'>;

const MapPage = ({ navigation, route }: MapProps) => {
  const {
    map,
    camera,
    moveCamera,
    selectedLevel,
    setSelectedLevel,
    selectedRoomId,
    setSelectedRoomId,
  } = useMap();
  const screenHeight = Dimensions.get('window').height;

  const [mapState, setMapState] = useState<Mapbox.MapState | null>(null);
  const [levels, setLevels] = useState<string[]>([]);
  const [buildingFetchLoading, setBuildingFetchLoading] = useState(false);
  const [buildings, setBuildings] = useState<Array<Number>>([]);
  const [shape, setShape] = useState<FeatureCollection | undefined>(
    defaultGeoJSON as unknown as FeatureCollection,
  );
  const [openSettingsModal, setOpenSettingsModal] = useState(false);
  const minZoomLevel = 18.5;

  const animatedValue = useRef(new Animated.Value(10)).current;

  // Ask permission for location
  useEffect(() => {
    (async () => {
      let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await ExpoLocation.getCurrentPositionAsync({});
      moveCamera(
        [location.coords.longitude, location.coords.latitude],
        '0',
        -1,
        19,
      );
    })();
  }, []);

  useEffect(() => {
    if (buildings.length > 0) {
      (async () => {
        const { data, error } = await getGeoJSON(buildings);
        if (data) setShape(data);
      })();
    } else {
      setShape(defaultGeoJSON as unknown as FeatureCollection);
      setSelectedLevel('0');
      setLevels([]);
    }
  }, [buildings]);

  useEffect(() => {
    const targetValue = selectedRoomId !== -1 ? screenHeight * 0.22 : 10;
    Animated.timing(animatedValue, {
      toValue: targetValue,
      duration: 250,
      useNativeDriver: false,
      easing: Easing.elastic(1),
    }).start();
  }, [selectedRoomId]);

  const fetchBuildingInScreen = async (state: Mapbox.MapState) => {
    if (state !== mapState) {
      const radius =
        measure(
          state.properties.bounds.ne[0],
          state.properties.bounds.ne[1],
          state.properties.bounds.sw[0],
          state.properties.bounds.sw[1],
        ) + 50;

      const center_lat = state.properties.center[0];
      const center_lon = state.properties.center[1];

      if (buildingFetchLoading) return;
      setBuildingFetchLoading(true);

      const { data, error } = await getNearbyBuildings(
        center_lat,
        center_lon,
        radius,
      );

      setBuildingFetchLoading(false);
      setMapState(state);

      if (error) {
        console.error(error);
        return;
      } else if (data) {
        const newBuildings = data.map((b: any) => b.gid);
        if (newBuildings !== buildings) {
          console.log(newBuildings);
          setBuildings(newBuildings);
          setLevels(
            [
              ...new Set(data.flatMap((item: any) => item.level_order)),
            ].sort() as string[],
          );
        }
      }
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          ref={map}
          onMapIdle={fetchBuildingInScreen}
          scaleBarEnabled={false}
          logoEnabled={false}
          attributionEnabled={false}
        >
          <LocationPuck />
          <Camera
            ref={camera}
            zoomLevel={19}
            pitch={20}
            heading={10}
            centerCoordinate={[107.60978612852416, -6.890546482705507]}
          />
          <MapSource
            selectedLevel={selectedLevel}
            minZoomLevel={minZoomLevel}
            shape={shape}
            selectedRoomId={selectedRoomId}
            setSelectedRoomId={setSelectedRoomId}
          />
        </MapView>
      </View>

      <View style={styles.searchBar}>
        <SearchBar
          navigation={navigation}
          setOpenSettingsModal={setOpenSettingsModal}
        />
      </View>
      {levels.length > 0 && (
        <Animated.View style={[styles.levelButtons, { bottom: animatedValue }]}>
          <LevelButtons
            levels={levels}
            selectedLevel={selectedLevel}
            setSelectedLevel={setSelectedLevel}
          />
        </Animated.View>
      )}
      <DetailModal
        selectedRoomId={selectedRoomId}
        setSelectedRoomId={setSelectedRoomId}
      />
      <SettingsModal
        navigation={navigation}
        openSettingsModal={openSettingsModal}
        setOpenSettingsModal={setOpenSettingsModal}
      />
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
    right: '3%',
  },
  searchBar: {
    position: 'absolute',
    width: '95%',
    top: 10,
  },
});

export default MapPage;
