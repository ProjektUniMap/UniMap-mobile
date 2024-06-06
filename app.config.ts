import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: 'UniMap',
  name: 'UniMap',
  plugins: [
    [
      '@rnmapbox/maps',
      {
        RNMapboxMapsDownloadToken: process.env
          .EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN as string,
      },
    ],
    'expo-secure-store',
    [
      'expo-location',
      {
        locationAlwaysAndWhenInUsePermission:
          'Allow UniMap to use your location.',
        isAndroidBackgroundLocationEnabled: true,
      },
    ],
  ],
  extra: {
    eas: {
      projectId: '4e780afa-3aa9-4aeb-925a-be548df32820',
    },
  },
});
