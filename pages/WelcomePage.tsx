import React from 'react';
import { Text, Image, View, StyleSheet, Button } from 'react-native';
import { useFonts, JosefinSans_400Regular, RobotoFlex_400Regular } from '@expo-google-fonts/dev';

const WelcomePage = () => {
  const [fontsLoaded] = useFonts({
    JosefinSans_400Regular,
    RobotoFlex_400Regular,
  })

  if (!fontsLoaded)
    return null;

  return (
    <View style={styles.container}>
      <View style={styles.imageItem}>
        <Image
          source={require('../assets/images/welcome.png')}
        />
      </View>
      <View style={styles.textItem}>
        <Text style={{ fontSize: 32, fontFamily: 'JosefinSans_400Regular' }}>Welcome to UniMap</Text>
      </View>
      <Text style={{ fontSize: 18, fontFamily: 'RobotoFlex_400Regular' }}>Finding you way, one click away</Text>
      <Button
        title='Log In'
        onPress={() => {}}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 26,
  },

  imageItem: {
    marginBottom: 54,
  },

  textItem: {
    marginBottom: 24,
  },
});

export default WelcomePage
