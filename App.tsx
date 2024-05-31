import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './context/AuthContext';
import Route from './routes';
import { MapProvider } from './context/MapContext';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <MapProvider>
          <Route />
        </MapProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
