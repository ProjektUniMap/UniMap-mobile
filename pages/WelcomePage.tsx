import React from 'react';
import {
  Text,
  Image,
  View,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { defaultBlue, kR1, kB3, kJSReg } from '../utils/constant';

const WelcomePage = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={require('../assets/images/welcome.png')}
            style={{ marginTop: 155, marginBottom: 54 }}
          />
          <Text style={[kJSReg, { marginBottom: 24 }]}>Welcome to UniMap</Text>
          <Text style={[kR1, { marginBottom: 58 }]}>
            Finding you way, one click away
          </Text>
          <Pressable
            style={[styles.button, { marginBottom: 16 }]}
            onPress={() => {}}
          >
            <Text style={[kB3, { color: 'white' }]}>Log In</Text>
          </Pressable>
          <Pressable
            style={[
              styles.button,
              { backgroundColor: 'white', marginBottom: 191 },
            ]}
            onPress={() => {}}
          >
            <Text style={[kB3, { color: defaultBlue }]}>Sign Up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 26,
  },

  button: {
    backgroundColor: defaultBlue,
    width: 240,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderColor: defaultBlue,
    borderWidth: 1,
  },
});

export default WelcomePage;
