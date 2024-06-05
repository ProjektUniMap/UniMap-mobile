import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SearchResult } from '../types';

interface PlaceItemProps {
  item: SearchResult;
  navigation: any;
  moveCamera: (
    [lon, lat]: [number, number],
    level: string,
    roomId: number,
  ) => void;
}

const PlaceItem = ({ item, navigation, moveCamera }: PlaceItemProps) => {
  return (
    <View>
      {item.type === 'building' ? (
        <Pressable
          style={styles.item}
          onPress={() => {
            console.log({
              centerSearch: [item.lat, item.lon],
              type: item.type,
            });
            moveCamera([item.lat, item.lon], item.level, -1);
            navigation.goBack();
          }}
        >
          <FontAwesome5 name="building" size={24} color="#1168A7" />
          <View>
            <Text style={styles.itemTitleText}>{item.name}</Text>
            <Text style={styles.itemSubtitleText}>Building</Text>
          </View>
        </Pressable>
      ) : (
        <Pressable
          style={styles.item}
          onPress={() => {
            console.log({
              centerSearch: [item.lon, item.lat],
              type: item.type,
            });
            moveCamera([item.lon, item.lat], item.level, item.id);
            navigation.goBack();
          }}
        >
          <MaterialIcons name="meeting-room" size={24} color="#1168A7" />
          <View>
            <Text style={styles.itemTitleText}>{item.name}</Text>
            <Text style={styles.itemSubtitleText}>
              Room at {item.building_name}
            </Text>
            <Text style={styles.itemSubtitleText}>Floor {item.level}</Text>
          </View>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '100%',
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    marginBottom: 10,
  },

  itemTitleText: {
    fontSize: 16,
    // fontWeight: 'bold',
  },

  itemSubtitleText: {
    fontSize: 14,
    color: 'gray',
    // fontWeight: 'bold',
  },
});

export default PlaceItem;
