import React, { useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface LevelButtonsProps {
  levels: string[];
  selectedLevel: string;
  setSelectedLevel: React.Dispatch<React.SetStateAction<string>>;
}

const LevelButtons = ({
  levels,
  selectedLevel,
  setSelectedLevel,
}: LevelButtonsProps) => {
  const flatList = useRef<FlatList>(null);

  const itemHeight = 30;
  const maxVisibleItems = 4;
  const containerHeight =
    levels.length > maxVisibleItems
      ? itemHeight * maxVisibleItems + 20 + 40
      : itemHeight * levels.length + 20;
  return (
    <View style={[styles.container, { height: containerHeight }]}>
      {levels.length > maxVisibleItems && (
        <AntDesign
          name="caretup"
          size={20}
          color="#1168A7"
          onPress={() => {
            flatList.current?.scrollToIndex({ index: 0, animated: true });
          }}
        />
      )}
      <FlatList
        ref={flatList}
        data={levels}
        renderItem={({ item, index }) => (
          <Pressable
            key={item}
            onPress={() => {
              setSelectedLevel(item);
              flatList.current?.scrollToIndex({ index: index, animated: true });
            }}
            style={[
              styles.item,
              selectedLevel === item && { backgroundColor: 'lightblue' },
            ]}
          >
            <Text>{item}</Text>
          </Pressable>
        )}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
      />
      {levels.length > maxVisibleItems && (
        <AntDesign
          name="caretdown"
          size={20}
          color="#1168A7"
          onPress={() => {
            flatList.current?.scrollToEnd({ animated: true });
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 50,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  listContainer: {
    paddingBottom: 10,
  },

  item: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 10,
    fontWeight: 'bold',
    width: 30,
    height: 30,
    borderRadius: 100,
  },
});

export default LevelButtons;
