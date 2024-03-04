import React from 'react';
import { StyleSheet, View } from 'react-native';
import Mapbox, { MapView } from '@rnmapbox/maps';

const App = () => {
	const EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN as string;
	Mapbox.setAccessToken(EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN);

	return (
		<View style={styles.page}>
			<View style={styles.container}>
				<MapView style={styles.map} />
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
