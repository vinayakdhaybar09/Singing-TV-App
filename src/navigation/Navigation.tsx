import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Favourite from '../pages/Favourite';
import Settings from '../pages/Settings';
import Home from '../pages/Home';
import Login from '../pages/Login';

export enum Screens {
  LOGIN = 'Login',
  HOME_SCREEN = 'Home',
  FAVOURITE = 'Favourite',
  SETTINGS = 'Settings',
}

export type AppStackParamList = {
  [Screens.LOGIN]: undefined;
  [Screens.HOME_SCREEN]: undefined;
  [Screens.FAVOURITE]: undefined;
  [Screens.SETTINGS]: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName={Screens.LOGIN}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={Screens.LOGIN} component={Login} />
      <Stack.Screen name={Screens.HOME_SCREEN} component={Home} />
      <Stack.Screen name={Screens.FAVOURITE} component={Favourite} />
      <Stack.Screen name={Screens.SETTINGS} component={Settings} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
