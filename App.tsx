import React, { useEffect, useState } from 'react';
import WelcomePage from './pages/WelcomePage';
import SignUpPage from './pages/SignUpPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import MapPage from './pages/MapPage';
import LogInPage from './pages/LogInPage';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';
import SplashScreen from './pages/SplashScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession(session);
        console.log(session);
        setIsLoading(false);
      } else {
        console.log('no user');
        setIsLoading(false);
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setSession(session);
        console.log(session);
      } else {
        console.log('no user');
      }
    });
  }, []);

  if (isLoading) return <SplashScreen />;

  return (
    <NavigationContainer>
      {session ? (
        <Stack.Navigator
          initialRouteName="Map"
          screenOptions={{
            headerTransparent: true,
          }}
        >
          <Stack.Screen
            name="Map"
            component={MapPage}
            options={{ headerTitle: '' }}
          />
        </Stack.Navigator>
      ) : (
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
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
