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
import { debounce } from 'lodash';
import { Divider } from '@rneui/themed';
import { useMap } from '../context/MapContext';
import { searchRoomAndBuilding } from '../api/search.api';
import { SearchResult } from '../types';
import PlaceItem from '../components/PlaceItem';

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
          <PlaceItem
            item={item}
            navigation={navigation}
            moveCamera={moveCamera}
          />
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
