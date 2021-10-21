import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from '../screens/SignInScreen';
import AddGroupScreen from '../screens/AddGroupScreen';
import ChatScreen from '../screens/ChatScreen';
import GroupsScreen from '../screens/GroupsScreen';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator name="chat" initialRouteName="SignInScreen">
        <Stack.Screen
          name="Sign In Screen"
          component={SignInScreen}
          options={{headerShown: false, title: 'Sign In Screen'}}
        />

        <Stack.Screen
          name="Add Group Screen"
          component={AddGroupScreen}
          options={{title: 'Add Group'}}
        />

        <Stack.Screen
          name="Chat Screen"
          component={ChatScreen}
          options={{title: 'Chat'}}
        />

        <Stack.Screen
          name="Groups Screen"
          component={GroupsScreen}
          options={{title: 'Groups'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStackNavigator;
