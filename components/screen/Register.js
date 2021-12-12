import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TextInput,
  Platform,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as AppConstant from '../../helpers/AppConstant';
import FlashAlert from './FlashAlert';

import { useDispatch, useSelector } from 'react-redux';
import { loginWithUser, registerUser } from '../../actions/userAction';

export default function Register({ navigation }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [alertMassage, setAlertMassage] = useState('');
  const [shouldShowAlert, setShouldShowAlert] = useState(false);

  const { requestId, user, loading, error, errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Fetch tasks on app opening
  useEffect(() => {
    if (error) {
      showAlert(errorMessage);
    }
  }, [requestId, error]);

  function handleBack() {
    navigation.goBack();
  }

  function handleRegister() {
    if (loading) return;

    if (!fullName || !email || !password) {
      showAlert('Please enter your name, email, and password');
      return;
    }

    let data = {
      fullName,
      email,
      password,
    };

    dispatch(registerUser(data));
  }

  function showAlert(message) {
    setAlertMassage(message);
    setShouldShowAlert(true);
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Background image */}
      <Image style={styles.backgroundImage} source={require('../../assets/Background.jpeg')} />
      <View style={styles.backgroundPadding} />

      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>FULL NAME</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your first name and last name"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>EMAIL</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>PASSWORD</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={AppConstant.SECONDARY_COLOR} />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonBack} onPress={handleBack}>
            <Ionicons name="md-return-down-back-outline" size={20} color={AppConstant.PRIMARY_COLOR} />
            <Text style={styles.buttonRegisterText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSubmit} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlashAlert message={alertMassage} showAlert={shouldShowAlert} onFinished={() => setShouldShowAlert(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '40%',
    resizeMode: 'stretch',
  },
  backgroundPadding: {
    height: '30%',
  },
  container: {
    backgroundColor: 'white',
    height: '100%',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  inputContainer: {
    width: '80%',
    marginTop: 20,
  },
  buttonContainer: {
    width: '80%',
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loadingContainer: {
    width: '80%',
    marginTop: 40,
  },
  inputTitle: {
    width: '100%',
    fontSize: 12,
    marginLeft: 18,
    fontWeight: '500',
    color: AppConstant.PRIMARY_COLOR,
  },
  input: {
    width: '100%',
    marginTop: 5,
    fontSize: 15,
    backgroundColor: 'yellow',
    backgroundColor: 'lightgray',
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  buttonSubmit: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: AppConstant.PRIMARY_COLOR,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },

  buttonBack: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: AppConstant.PRIMARY_COLOR,
    borderWidth: 1,
    flexDirection: 'row',
  },
  buttonRegisterText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: AppConstant.PRIMARY_COLOR,
    marginLeft: 10,
  },
});
