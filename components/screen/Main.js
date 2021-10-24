import React, { useEffect, useState } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import TaskInput from './TaskInput';
import FlashAlert from './FlashAlert';

import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, addTask, updateTask, deleteTask, setCompletedTask } from '../../store/reducers/taskSlice';

export default function Main() {
  // Data logic handles
  const { pendingTasks, completedTasks } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  const handleAddNewTask = (taskContent) => {
    if (taskContent.trim().length === 0) {
      showAlert('Content cannot be blank');
      return false;
    }

    dispatch(addTask(taskContent));
    return true;
  };

  const handleUpdateTask = (itemData) => {
    if (itemData.name.trim().length === 0) {
      showAlert('Content cannot be blank');
      return false;
    }

    dispatch(updateTask(itemData));
    setIsUpdating(false);
    return true;
  };

  const handleDeleteTask = (itemData) => {
    dispatch(deleteTask(itemData.id));

    setIsUpdating(false);
  };

  const setTaskToBeCompleted = (itemData, isCompleted) => {
    let data = {
      ...itemData,
      isCompleted: isCompleted,
    };

    dispatch(setCompletedTask(data));
  };

  // UI logic handles
  const [alertMassage, setAlertMassage] = useState('');
  const [shouldShowAlert, setShouldShowAlert] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);
  const [taskToBeUpdated, setTaskToBeUpdated] = useState({});

  function showAlert(message) {
    setAlertMassage(message);
    setShouldShowAlert(true);
  }

  // Views
  const renderItem = ({ item }) => (
    <Item
      itemData={item}
      onCellPressed={(itemData) => {
        setIsUpdating(true);
        setTaskToBeUpdated(itemData);
      }}
      onTaskCompleted={(itemData, isCompleted) => setTaskToBeCompleted(itemData, isCompleted)}
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
              data={pendingTasks}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              bounces={false}
            />
          </View>

          {/* Completed task list */}
          <View style={styles.listContainer}>
            <Text style={styles.listTile}>Completed</Text>
            <FlatList
              style={styles.list}
              data={completedTasks}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              bounces={false}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>

      <TaskInput
        isUpdating={isUpdating}
        selectedTask={taskToBeUpdated}
        onAddButtonPressed={(text) => handleAddNewTask(text)}
        onUpdateButtonPressed={(task) => handleUpdateTask(task)}
        onDeleteButtonPressed={(task) => handleDeleteTask(task)}
      />

      <FlashAlert message={alertMassage} showAlert={shouldShowAlert} onFinished={() => setShouldShowAlert(false)} />
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
