import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import TaskInput from './TaskInput';

const DATA = [
  {
    id: '1',
    name: 'Dimsum',
    isCompleted: false,
  },
  {
    id: '2',
    name: 'Second Item',
    isCompleted: false,
  },
  {
    id: '3',
    name: 'Third Item',
    isCompleted: false,
  },
  {
    id: '4',
    name: '4rd Item Hehehe',
    isCompleted: true,
  },
];

let pendingTask = [];
let completedTask = [];

function separateData() {
  [pendingTask, completedTask] = DATA.reduce(
    (result, item) => {
      result[item.isCompleted ? 1 : 0].push(item);
      return result;
    },
    [[], []]
  );
}

function setCompletedTask(task, isCompleted) {
  let itemIdx = DATA.findIndex((obj) => obj.id == task.id);
  DATA[itemIdx].isCompleted = isCompleted;
}

export default function Main() {
  separateData();

  const [isUpdating, setIsUpdating] = useState(false);
  const [taskToBeUpdated, setTaskToBeUpdated] = useState({});
  const [needUpdateData, setNeedUpdateData] = useState(false);

  const reloadList = () => {
    separateData();
    setNeedUpdateData(!needUpdateData);
  };

  const taskCompleted = (itemData, isCompleted) => {
    setCompletedTask(itemData, isCompleted);
    reloadList();
  };

  const addNewTask = (newTask) => {
    DATA.push(newTask);
    reloadList();
  };

  const renderItem = ({ item }) => (
    <Item
      itemData={item}
      onCellPressed={(itemData) => {
        setIsUpdating(true);
        setTaskToBeUpdated(itemData);
      }}
      onTaskCompleted={(itemData, isCompleted) => taskCompleted(itemData, isCompleted)}
    />
  );

  return (
    <SafeAreaView style={styles.mainContainerView}>
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => setIsUpdating(false)}>
        <View style={{ flex: 1 }}>
          {/* Pending task list */}
          <View style={styles.listContainer}>
            <Text style={styles.listTile}>To Do</Text>
            <FlatList
              style={styles.list}
              data={pendingTask}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              bounces={false}
              extraData={needUpdateData}
            />
          </View>

          {/* Completed task list */}
          <View style={styles.listContainer}>
            <Text style={styles.listTile}>Completed</Text>
            <FlatList
              style={styles.list}
              data={completedTask}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              bounces={false}
              extraData={needUpdateData}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      <TaskInput
        isUpdating={isUpdating}
        taskToBeUpdated={taskToBeUpdated}
        onNewTaskAdded={(newTask) => addNewTask(newTask)}
      />
    </SafeAreaView>
  );
}

function Item({ itemData, onCellPressed, onTaskCompleted }) {
  let [isChecked, setIsChecked] = useState(itemData.isCompleted);

  const onPress = () => {
    isChecked = !isChecked;
    setIsChecked(isChecked);
    onTaskCompleted(itemData, isChecked);
  };

  const iconName = isChecked ? 'checkmark-circle-sharp' : 'ellipse-outline';
  const contentStyle = isChecked ? styles.contentCompleted : {};

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={() => onCellPressed(itemData)}>
      <View style={{}}>
        <TouchableOpacity onPress={onPress}>
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
  mainContainerView: {
    backgroundColor: 'teal',
    height: '100%',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
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

  // Items
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
