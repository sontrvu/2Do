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
import * as AppConstant from '../../helpers/AppConstant';
import FlashAlert from './FlashAlert';

import { useDispatch, useSelector } from 'react-redux';
import { loginWithUser, registerUser } from '../../actions/userAction';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [alertMassage, setAlertMassage] = useState('');
  const [shouldShowAlert, setShouldShowAlert] = useState(false);

  const { requestId, user, loading, error, errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  function showAlert(message) {
    setAlertMassage(message);
    setShouldShowAlert(true);
  }

  useEffect(() => {
    if (error) {
      showAlert(errorMessage);
    }
  }, [requestId, error]);

  function handleLogIn() {
    if (loading) return;

    if (!email || !password) {
      showAlert('Please enter email and password');
      return;
    }

    let data = {
      email,
      password,
    };

    dispatch(loginWithUser(data));
  }

  function handleRegister() {
    navigation.navigate('Register');

    // if (loading) return;

    // if (!email || !password) {
    //   console.log('Please enter email and password');
    //   return;
    // }

    // let data = {
    //   email,
    //   password,
    // };

    // dispatch(registerUser(data));
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Background image */}
      <Image style={styles.backgroundImage} source={require('../../assets/Background.jpeg')} />
      <View style={styles.backgroundPadding} />

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
        <View style={styles.buttonContainer}>
          <ActivityIndicator size="small" color={AppConstant.SECONDARY_COLOR} />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonLogin} onPress={handleLogIn}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRegister} onPress={handleRegister}>
            <Text style={styles.buttonRegisterText}>Need an account? Register Now!</Text>
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
  buttonLogin: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: AppConstant.PRIMARY_COLOR,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },

  buttonRegister: {
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  buttonRegisterText: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingVertical: 10,
    color: AppConstant.PRIMARY_COLOR,
  },
});
