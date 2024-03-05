import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
	...config,
	slug: 'UniMap',
	name: 'UniMap',
	plugins: [
		[
			'@rnmapbox/maps',
			{
				RNMapboxMapsDownloadToken: process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN as string,
			},
		],
	],
});
