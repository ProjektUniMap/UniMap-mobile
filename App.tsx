import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './context/AuthContext';
import Route from './routes';
import { MapProvider } from './context/MapContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <AuthProvider>
          <MapProvider>
            <Route />
          </MapProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
