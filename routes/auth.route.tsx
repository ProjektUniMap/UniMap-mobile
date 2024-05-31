import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomePage from '../pages/WelcomePage';
import SignUpPage from '../pages/SignUpPage';
import LogInPage from '../pages/LogInPage';

export type AuthStackParamList = {
  Welcome: undefined;
  SignUp: undefined;
  LogIn: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerTransparent: true,
      }}
    >
      <AuthStack.Screen
        name="Welcome"
        component={WelcomePage}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUpPage}
        options={{ headerTitle: '' }}
      />
      <AuthStack.Screen
        name="LogIn"
        component={LogInPage}
        options={{ headerTitle: '' }}
      />
    </AuthStack.Navigator>
  );
};
