import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TaskList({ title, data, onCellPressed, onCheckPressed }) {
  const renderItem = ({ item }) => (
    <Item itemData={item} onCellPressed={onCellPressed} onCheckPressed={onCheckPressed} />
  );

  return (
    <View style={styles.listContainer}>
      <Text style={styles.listTile}>{title}</Text>
      <FlatList
        style={styles.list}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        bounces={false}
      />
    </View>
  );
}

function Item({ itemData, onCellPressed, onCheckPressed }) {
  let [isChecked, setIsChecked] = useState(itemData.isCompleted);

  const handleCheckPressed = () => {
    isChecked = !isChecked;
    setIsChecked(isChecked);
    onCheckPressed(itemData, isChecked);
  };

  // Set check mark and set erased style for completed tasks
  const iconName = isChecked ? 'checkmark-circle-sharp' : 'ellipse-outline';
  const contentStyle = isChecked ? styles.contentCompleted : {};

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={() => onCellPressed(itemData)}>
      <View>
        <TouchableOpacity onPress={handleCheckPressed}>
          <Ionicons name={iconName} size={30} color="teal" />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text style={[styles.content, contentStyle]}>{itemData.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  listTile: {
    color: 'white',
    fontSize: 30,
    fontWeight: '600',
  },
  list: {
    marginTop: 10,
  },

  // Cell item
  itemContainer: {
    flexDirection: 'row',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 5,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
  },
  content: {
    fontSize: 15,
  },
  contentCompleted: {
    textDecorationLine: 'line-through',
  },
});
