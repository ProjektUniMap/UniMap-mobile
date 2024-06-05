import { useAuth } from '../context/AuthContext';
import { AppNavigator } from './app.route';
import { AuthNavigator } from './auth.route';
import SplashScreen from '../pages/SplashScreen';

const Route = () => {
  const { isLoading, session } = useAuth();
  if (isLoading) return <SplashScreen />;
  return session ? <AppNavigator /> : <AuthNavigator />;
};

export default Route;
