import {
  Text,
  Image,
  View,
  StyleSheet,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={require('../assets/images/splash.png')}
        style={{ width: '80%' }}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;
