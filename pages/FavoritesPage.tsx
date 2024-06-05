import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import PlaceItem from '../components/PlaceItem';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from '../routes/app.route';
import { useMap } from '../context/MapContext';
import { Divider } from '@rneui/themed';
import { useAuth } from '../context/AuthContext';
import { SearchResult } from '../types';
import { getUserSavedRoomsAsSearchResults } from '../api/profile.api';

type FavoritesProps = NativeStackScreenProps<AppStackParamList, 'Favorites'>;

const FavoritesPage = ({ navigation, route }: FavoritesProps) => {
  const { moveCamera } = useMap();
  const { profile } = useAuth();
  const [favorites, setFavorites] = useState<SearchResult[]>();

  useEffect(() => {
    (async () => {
      console.log('effect');
      const { data } = await getUserSavedRoomsAsSearchResults(
        profile?.id as string,
      );
      if (data) setFavorites(data);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favorites}
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
    marginTop: 64,
  },

  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
});

export default FavoritesPage;
