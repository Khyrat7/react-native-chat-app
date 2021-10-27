import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from '../screens/SignInScreen';
import AddGroupScreen from '../screens/AddGroupScreen';
import ChatScreen from '../screens/ChatScreen';
import GroupsScreen from '../screens/GroupsScreen';
import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator name="chat" initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false, title: 'Splash Screen'}}
        />

        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
          options={{headerShown: false, title: 'Sign In Screen'}}
        />

        <Stack.Screen
          name="AddGroupScreen"
          component={AddGroupScreen}
          options={{title: 'Add Group'}}
        />

        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{title: 'Chat'}}
        />

        <Stack.Screen
          name="GroupsScreen"
          component={GroupsScreen}
          options={{title: 'Groups'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
