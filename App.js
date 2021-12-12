import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider } from 'react-redux';
import store from './app/store';
import { useSelector, useDispatch } from 'react-redux';
import { getLoggedInUser } from './actions/userAction';

import MainScreen from './components/screen/Main';
import LoginScreen from './components/screen/Login';
import RegisterScreen from './components/screen/Register';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <Landing />
    </Provider>
  );
}

function Landing() {
  const { requestId, user, loading, error, errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedInUser());
  }, []);

  const renderScreen = () => {
    if (user.uid) {
      return (
        <Stack.Group screenOptions={{ headerShown: false, presentation: 'transparentModal' }}>
          <Stack.Screen name="Main" component={MainScreen} />
        </Stack.Group>
      );
    } else {
      return (
        <Stack.Group screenOptions={{ headerShown: false, presentation: 'transparentModal' }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Group>
      );
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>{renderScreen()}</Stack.Navigator>
    </NavigationContainer>
  );
}
