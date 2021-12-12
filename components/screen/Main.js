import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  Alert,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Platform,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TaskInput from './TaskInput';
import FlashAlert from './FlashAlert';
import TaskList from './TaskList';
import * as AppConstant from '../../helpers/AppConstant';

import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../actions/userAction';
import {
  fetchTasks,
  emptyTasksBoard,
  addTask,
  updateTask,
  deleteTask,
  setCompletedTask,
} from '../../actions/taskAction';
export default function Main() {
  // Data logic handles
  const { pendingTasks, completedTasks, loading } = useSelector((state) => state.task);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Fetch tasks on app opening
  useEffect(() => {
    let data = {
      uid: user.uid,
    };

    dispatch(fetchTasks(data));
  }, []);

  const handleLogout = () => {
    // Confirm log out alert
    const alertActions = [
      {
        text: 'Cancel',
        style: 'default',
      },
      {
        text: 'Confirm',
        style: 'destructive',
        onPress: () => {
          dispatch(emptyTasksBoard());
          dispatch(logoutUser());
        },
      },
    ];

    Alert.alert('Log out', 'Are you sure you want to log out?', alertActions, { cancelable: false });
  };

  const handleAddNewTask = (taskContent) => {
    if (taskContent.trim().length === 0) {
      showAlert('Content cannot be blank');
      return false;
    }

    let data = {
      uid: user.uid,
      taskContent: taskContent,
    };

    dispatch(addTask(data));
    return true;
  };

  const handleUpdateTask = (itemData) => {
    if (itemData.name.trim().length === 0) {
      showAlert('Content cannot be blank');
      return false;
    }

    let data = {
      uid: user.uid,
      task: itemData,
    };

    dispatch(updateTask(data));
    setIsUpdating(false);
    return true;
  };

  const handleDeleteTask = (itemData) => {
    let data = {
      uid: user.uid,
      task: itemData,
    };

    dispatch(deleteTask(data));
    setIsUpdating(false);
  };

  const setTaskToBeCompleted = (itemData, isCompleted) => {
    let data = {
      uid: user.uid,
      task: {
        ...itemData,
        isCompleted: isCompleted,
      },
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
      {/* Log out button */}
      <TouchableOpacity style={styles.logOutButton} onPress={handleLogout}>
        <Text style={styles.logOutButtonText}>LOG OUT</Text>
        <Ionicons name="exit-outline" size={20} color="white" />
      </TouchableOpacity>

      {/* Only show loading indicator when the task list is empty (Like when the screen is first loaded) */}
      {loading && pendingTasks.length == 0 && completedTasks.length == 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={'white'} />
        </View>
      ) : (
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
      )}

      <TaskInput
        isLoading={loading}
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
    backgroundColor: AppConstant.PRIMARY_COLOR,
    height: '100%',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logOutButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#ed4c60',
    borderRadius: 10,
    marginRight: 10,
    marginTop: 10,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logOutButtonText: {
    color: 'white',
    fontSize: 12,
    marginRight: 5,
  },
});
