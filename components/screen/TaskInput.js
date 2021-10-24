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
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

export default function TaskInput({
  isUpdating,
  taskToBeUpdated,
  onAddButtonPressed,
  onUpdateButtonPressed,
  onDeleteButtonPressed,
}) {
  let addStyle = isUpdating ? { display: 'none' } : {};
  let updateStyle = isUpdating ? {} : { display: 'none' };

  let newTaskTextInput;
  const [addText, setAddText] = useState('');

  const handleAddButtonPressed = () => {
    if (onAddButtonPressed(addText) === true) {
      newTaskTextInput.clear();
      Keyboard.dismiss();
    }
  };

  const handleDeleteButtonPressed = () => {
    onDeleteButtonPressed(taskToBeUpdated);
  };

  let uppdateTaskTextInput;
  useEffect(() => {
    if (isUpdating) {
      uppdateTaskTextInput.focus();
    } else {
      Keyboard.dismiss();
    }
  }, [isUpdating]);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={[styles.bottomInputContainer, addStyle]}>
        <TextInput
          style={styles.bottomTextInput}
          placeholder={'Add a new task'}
          onChangeText={(text) => setAddText(text)}
          ref={(input) => {
            newTaskTextInput = input;
          }}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddButtonPressed}>
          <Ionicons name="arrow-up-circle" size={35} color="teal" />
        </TouchableOpacity>
      </View>

      <View style={[styles.bottomInputContainer, updateStyle]}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteButtonPressed}>
          <Text style={styles.deleteButtonTitle}>Delete</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.bottomTextInput}
          placeholder={'Should be something here'}
          value={taskToBeUpdated.name}
          ref={(input) => {
            uppdateTaskTextInput = input;
          }}
        />
        <TouchableOpacity style={styles.updateButton}>
          <Ionicons name="arrow-up-circle-outline" size={35} color="teal" />
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
