import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './context/AuthContext';
import Route from './routes';

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Route />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
