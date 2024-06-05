import React, { useState, useEffect, useCallback } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { debounce } from 'lodash';
import { MaterialIcons } from '@expo/vector-icons';
import { Divider } from '@rneui/themed';
import { useMap } from '../context/MapContext';
import { searchRoomAndBuilding } from '../api/search.api';
import { SearchResult } from '../types';

interface SearchPageProps {
  navigation: NavigationProp<any>;
}

const SearchPage = ({ navigation }: SearchPageProps) => {
  const { moveCamera } = useMap();

  const [query, setQuery] = useState('');
  const [displayedQuery, setDisplayedQuery] = useState('');
  const [searchResult, setSearchResult] = useState<Array<SearchResult>>([]);

  const debounceCall = useCallback(
    debounce((q: string) => {
      setQuery(q);
    }, 500),
    [],
  );

  const handleTextChange = (text: string) => {
    setDisplayedQuery(text);
    debounceCall(text);
  };

  useEffect(() => {
    console.log('Query:', query);
    const fetchRooms = async (q: string) => {
      const { data, error } = await searchRoomAndBuilding(query);
      setSearchResult(data);
    };

    fetchRooms(query);
  }, [query]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBox}>
        <TouchableOpacity
          style={styles.leftHandSide}
          onPressIn={() => {
            navigation.goBack();
          }}
        >
          <MaterialCommunityIcons
            name="keyboard-backspace"
            size={18}
            color="black"
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Find building or room"
          value={displayedQuery}
          onChangeText={handleTextChange}
        />
      </View>

      <FlatList
        data={searchResult}
        style={styles.itemList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View>
            {item.type === 'building' ? (
              <Pressable
                style={styles.item}
                onPress={() => {
                  console.log({
                    centerSearch: [item.lat, item.lon],
                    type: item.type,
                  });
                  moveCamera([item.lat, item.lon]);
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
                  moveCamera([item.lon, item.lat]);
                  navigation.goBack();
                }}
              >
                <MaterialIcons name="meeting-room" size={24} color="#1168A7" />
                <View>
                  <Text style={styles.itemTitleText}>{item.name}</Text>
                  <Text style={styles.itemSubtitleText}>
                    Room at {item.building_name}
                  </Text>
                  <Text style={styles.itemSubtitleText}>
                    Floor {item.level}
                  </Text>
                </View>
              </Pressable>
            )}
          </View>
        )}
        ItemSeparatorComponent={() => <Divider style={{ marginBottom: 10 }} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemList: {
    width: '85%',
    // gap: 8,
    marginTop: 16,
  },

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

  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  searchBox: {
    marginTop: 10,
    backgroundColor: 'white',
    height: 40,
    width: '95%',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 3,
    gap: 10,
    borderWidth: 0.2,
  },
  leftHandSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightHandSide: {
    padding: 8,
    flex: 1,
  },
  text: {
    color: 'gray',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default SearchPage;
