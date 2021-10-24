import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableWithoutFeedback, Platform, StatusBar } from 'react-native';
import TaskInput from './TaskInput';
import FlashAlert from './FlashAlert';
import TaskList from './TaskList';

import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, addTask, updateTask, deleteTask, setCompletedTask } from '../../store/reducers/taskSlice';

export default function Main() {
  // Data logic handles
  const { pendingTasks, completedTasks } = useSelector((state) => state.task);
  const dispatch = useDispatch();

  // Fetch tasks on app opening
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

  return (
    <SafeAreaView style={styles.mainContainerView}>
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => setIsUpdating(false)}>
        <View style={{ flex: 1 }}>
          {/* Pending task list */}
          <TaskList
            title={'To Do'}
            data={pendingTasks}
            onCellPressed={(itemData) => {
              setIsUpdating(true);
              setTaskToBeUpdated(itemData);
            }}
            onCheckPressed={(itemData, isCompleted) => setTaskToBeCompleted(itemData, isCompleted)}
          />

          {/* Completed task list */}
          <TaskList
            title={'Completed'}
            data={completedTasks}
            onCellPressed={(itemData) => {
              setIsUpdating(true);
              setTaskToBeUpdated(itemData);
            }}
            onCheckPressed={(itemData, isCompleted) => setTaskToBeCompleted(itemData, isCompleted)}
          />
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

const styles = StyleSheet.create({
  mainContainerView: {
    backgroundColor: 'teal',
    height: '100%',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
