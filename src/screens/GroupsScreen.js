import React, {useLayoutEffect, useState, useEffect} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import ButtonWithBackGround from '../components/ButtonWithBackground';
import Images from '../const/Images';
import auth from '@react-native-firebase/auth';

const GroupsScreen = props => {
  const {navigation} = props;
  useLayoutEffect(() => {
    // setting the navigation bar
    navigation.setOptions({
      headerRight: () => (
        <ButtonWithBackGround
          onPress={() => {
            navigation.navigate('AddGroupScreen');
          }}
          image={Images.add}
        />
      ),

      headerLeft: () => (
        <ButtonWithBackGround
          onPress={() => {
            auth()
              .signOut()
              .then(() => {
                console.log('User signed out!');
                navigation.navigate('SignInScreen');
              });
          }}
          image={Images.logout}
        />
      ),
    });
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}> Groups Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebebeb',
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default GroupsScreen;
