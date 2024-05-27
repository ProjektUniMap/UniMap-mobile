import React from 'react';
import WelcomePage from './pages/WelcomePage';
import SignUpPage from './pages/SignUpPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import MapPage from './pages/MapPage';
import LogInPage from './pages/LogInPage';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerTransparent: true,
        }}
      >
        <Stack.Screen
          name="Welcome"
          component={WelcomePage}
          options={{ headerTitle: '' }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpPage}
          options={{
            headerTitle: '',
            headerBackVisible: true,
          }}
        />
        <Stack.Screen
          name="LogIn"
          component={LogInPage}
          options={{
            headerTitle: '',
            headerBackVisible: true,
          }}
        />
        <Stack.Screen name="Map" component={MapPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
