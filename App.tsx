import React, { useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Mapbox, { MapView, Camera } from '@rnmapbox/maps';
import MapSource from './components/MapSource';
import MapGeoJSON from './assets/maps/labtekv.json';
import { FeatureCollection, Feature } from 'geojson';

const App = () => {
	const EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN as string;
	Mapbox.setAccessToken(EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN);

	const map = useRef<MapView>(null);
	const [levels, setLevels] = useState<string[]>([]);
	const [selectedLevel, setSelectedLevel] = useState(2);
	const [shape, setShape] = useState<FeatureCollection>(
		MapGeoJSON as unknown as FeatureCollection
	);
	const minZoomLevel = 18.5;

	const getAvailableLevels = async (state: Mapbox.MapState) => {
		if (state.properties.zoom >= minZoomLevel) {
			const features = (await map.current?.querySourceFeatures('indoor'))?.features;
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
		}
	};

	return (
		<View style={styles.page}>
			<View style={styles.container}>
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
		</View>
	);
};

export default App;

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
});
