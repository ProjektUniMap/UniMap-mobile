import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapPage from '../pages/MapPage';
import SearchPage from '../pages/SearchPage';
import ProfilePage from '../pages/ProfilePage';
import FavoritesPage from '../pages/FavoritesPage';

export type AppStackParamList = {
  Map: undefined;
  Search: undefined;
  Profile: undefined;
  Favorites: undefined;
};

const AppStack = createNativeStackNavigator<AppStackParamList>();

export const AppNavigator = () => {
  return (
    <AppStack.Navigator
      initialRouteName="Map"
      screenOptions={{ headerTransparent: true }}
    >
      <AppStack.Screen
        name="Map"
        component={MapPage}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Search"
        component={SearchPage}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="Profile"
        component={ProfilePage}
        options={{ headerTitle: 'Edit Profile' }}
      />
      <AppStack.Screen
        name="Favorites"
        component={FavoritesPage}
        options={{ headerTitle: 'Favorites' }}
      />
    </AppStack.Navigator>
  );
};
