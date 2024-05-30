import React, { useEffect, useState } from 'react';
import WelcomePage from './pages/WelcomePage';
import SignUpPage from './pages/SignUpPage';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import MapPage from './pages/MapPage';
import LogInPage from './pages/LogInPage';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';
import SplashScreen from './pages/SplashScreen';
import SearchPage from './pages/SearchPage';
import { enableScreens } from 'react-native-screens';

export type RootStackParamList = {
  Map: undefined;
  Search: undefined;
  Welcome: { center: number[] } | undefined;
  SignUp: undefined;
  LogIn: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  if (isLoading) return <SplashScreen />;

  return (
    <NavigationContainer>
      {session ? (
        <Stack.Navigator
          id="MyStack"
          initialRouteName="Map"
          screenOptions={{
            headerTransparent: true,
          }}
        >
          <Stack.Screen
            name="Map"
            component={MapPage}
            initialParams={{ center: [107.60978612852416, -6.890546482705507] }}
            options={{ headerTitle: '', headerShown: false }}
          />
          <Stack.Screen
            name="Search"
            component={SearchPage}
            options={{ headerTitle: '', headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          id="MyStack"
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
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
