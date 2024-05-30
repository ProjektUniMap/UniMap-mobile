import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';

interface SearchBarProps {
  navigation: NavigationProp<any>;
}

const SearchBar = ({ navigation }: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.leftHandSide}
        onPressIn={() => {
          navigation.navigate('Search');
        }}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <MaterialCommunityIcons name="magnify" size={18} color="black" />
        <Text style={styles.text}>Find building or room</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.rightHandSide}
        onPressIn={() => {
          console.log('Profile icon pressed');
        }}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <MaterialCommunityIcons
          name="account-circle-outline"
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 40,
    width: '100%',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 3,
  },
  leftHandSide: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightHandSide: {
    // padding: 8,
  },
  text: {
    color: 'gray',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default SearchBar;
