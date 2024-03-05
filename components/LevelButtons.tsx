import React, { useRef } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface LevelButtonsProps {
	levels: string[];
	selectedLevel: string;
	setSelectedLevel: React.Dispatch<React.SetStateAction<string>>;
}

const LevelButtons = ({ levels, selectedLevel, setSelectedLevel }: LevelButtonsProps) => {
	const flatList = useRef<FlatList>(null);

	return (
		<View style={styles.container}>
			<AntDesign
				name="caretup"
				size={20}
				color="darkblue"
				onPress={() => flatList.current?.scrollToIndex({ index: 0, animated: true })}
			/>
			<FlatList
				ref={flatList}
				data={levels}
				renderItem={({ item, index, separators }) => (
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
			/>
			<AntDesign
				name="caretdown"
				size={20}
				color="darkblue"
				onPress={() => flatList.current?.scrollToEnd({ animated: true })}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		paddingHorizontal: 5,
		paddingVertical: 10,
		height: 200,
		borderRadius: 50,
		borderColor: 'darkblue',
		borderWidth: 1,

		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',

		gap: 5,
	},

	item: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',

		fontSize: 10,
		fontWeight: 'bold',

		width: 30,
		height: 30,
		borderRadius: 100,
		// backgroundColor: 'lightgrey',

		// marginBottom: 2,
	},
});

export default LevelButtons;
