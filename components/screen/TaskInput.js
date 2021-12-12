import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import * as AppConstant from '../../helpers/AppConstant';

export default function TaskInput({
  isLoading,
  isUpdating,
  selectedTask,
  onAddButtonPressed,
  onUpdateButtonPressed,
  onDeleteButtonPressed,
}) {
  // There are 2 inputs for add and update task, toggle to show only 1 and hide the other
  let addStyle = isUpdating ? { display: 'none' } : {};
  let updateStyle = isUpdating ? {} : { display: 'none' };
  let loadingStyle = {}; // isLoading ? { backgroundColor: '#999' } : {};

  let newTaskTextInput;
  let uppdateTaskTextInput;
  const [addText, setAddText] = useState('');
  const [updateText, setUpdateText] = useState(selectedTask.name);

  // Loading icon rotate animation
  let rotateValueHolder = new Animated.Value(0);
  const rotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animationLoop = Animated.loop(
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 1200,
      easing: Easing.linear,
      useNativeDriver: false,
    })
  );

  useEffect(() => {
    // Start loading icon animation
    animationLoop.start();
  }, [isLoading]);

  useEffect(() => {
    // Show keyboard and update task input content when a task is selected to edit
    if (isUpdating) {
      uppdateTaskTextInput.focus();
    } else {
      Keyboard.dismiss();
    }

    setUpdateText(selectedTask.name);
  }, [isUpdating, selectedTask]);

  // Handle buttons pressed ...
  const handleAddButtonPressed = () => {
    if (onAddButtonPressed(addText) === true) {
      setAddText('');
      Keyboard.dismiss();
    }
  };

  const handleUpdateButtonPressed = () => {
    let updatedTask = { ...selectedTask, name: updateText };

    if (onUpdateButtonPressed(updatedTask) === true) {
      setUpdateText('');
      Keyboard.dismiss();
    }
  };

  const handleDeleteButtonPressed = () => {
    onDeleteButtonPressed(selectedTask);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* Only show either add or update input */}

      {/* Add task input */}
      <View style={[styles.bottomInputContainer, addStyle, loadingStyle]}>
        <TextInput
          style={styles.bottomTextInput}
          placeholder={'Add a new task'}
          value={addText}
          onChangeText={(text) => setAddText(text)}
          ref={(input) => {
            newTaskTextInput = input;
          }}
        />
        {isLoading ? (
          <Animated.View style={[styles.loadingIcon, { transform: [{ rotate: rotateData }] }]}>
            <Ionicons name="sync-circle-sharp" size={35} color={AppConstant.PRIMARY_COLOR} />
          </Animated.View>
        ) : (
          <TouchableOpacity style={styles.addButton} onPress={handleAddButtonPressed}>
            <Ionicons name="arrow-up-circle" size={35} color={AppConstant.PRIMARY_COLOR} />
          </TouchableOpacity>
        )}
      </View>

      {/* Update task input */}
      <View style={[styles.bottomInputContainer, updateStyle]}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteButtonPressed}>
          <Text style={styles.deleteButtonTitle}>Delete</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.bottomTextInput}
          placeholder={'Should be something here'}
          value={updateText}
          onChangeText={(text) => setUpdateText(text)}
          ref={(input) => {
            uppdateTaskTextInput = input;
          }}
        />
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateButtonPressed}>
          <Ionicons name="arrow-up-circle-outline" size={35} color={AppConstant.PRIMARY_COLOR} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  bottomInputContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomTextInput: {
    flex: 1,
    paddingLeft: 10,
  },
  loadingIcon: {
    paddingLeft: 2,
    // backgroundColor: 'red',
  },
  addButton: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  updateButton: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  deleteButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 99,
  },
  deleteButtonTitle: {
    color: 'red',
    fontSize: 12,
  },
});
