import * as React from 'react';
import {Button, Dimensions, Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import SideBar from '../components/sections/Sidebar';
import Rightbar from '../components/sections/Rightbar';
import Settings from '../pages/Settings';
import Search from '../pages/Search';
import Home from '../pages/Home';
import Favourite from '../pages/Favourite';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../pages/Login';
import Profile from '../pages/Profile';

// function HomeScreen({navigation}) {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Button
//         // onPress={() => navigation.getParent('LeftDrawer').openDrawer()}
//         title="Open left drawer"
//       />
//       <Button
//         // onPress={() => navigation.getParent('RightDrawer').openDrawer()}
//         title="Open right drawer"
//       />
//     </View>
//   );
// }

// function RightDrawerContent() {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Text>This is the right drawer</Text>
//     </View>
//   );
// }

const windowWidth = Dimensions.get('window').width;

const LeftDrawer = createDrawerNavigator();

function LeftDrawerScreen() {
  return (
    <LeftDrawer.Navigator
    // initialRouteName='Home'
      id="LeftDrawer"
      drawerContent={props => <SideBar props={props} />}
      screenOptions={{
        drawerPosition: 'left',
        drawerType: 'permanent',
        headerShown: false,
        drawerStyle: {width: windowWidth * 0.15},
      }}>
      {/* <LeftDrawer.Screen name="Home" component={HomeScreen} /> */}
      {/* <LeftDrawer.Screen name={'Settings'} component={Settings} /> */}
      <LeftDrawer.Screen name={'Home'} component={Home} />
      <LeftDrawer.Screen name={'Search'} component={Search} />
      <LeftDrawer.Screen name={'Favourite'} component={Favourite} />
      <LeftDrawer.Screen name={'Profile'} component={Profile} />
    </LeftDrawer.Navigator>
  );
}

const RightDrawer = createDrawerNavigator();

function RightDrawerScreen() {
  return (
    <RightDrawer.Navigator
      id="RightDrawer"
      drawerContent={props => <Rightbar />}
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
        drawerType: 'permanent',
        drawerStyle: {width: windowWidth * 0.25, borderLeftColor:"#0E114e"},
      }}>
      <RightDrawer.Screen name="HomeDrawer" component={LeftDrawerScreen} />
    </RightDrawer.Navigator>
  );
}


const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={"Login"} component={Login} />
      <Stack.Screen name="MainStack" component={RightDrawerScreen} />
    </Stack.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
