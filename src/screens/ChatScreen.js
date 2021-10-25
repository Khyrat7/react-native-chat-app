import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import Colors from '../../utils/Colors';
import Constants from '../const/Constants';
import Utility from '../../utils/Utility';

const ChatScreen = props => {
  const {navigation, route} = props;
  // console.log(route.params);

  return (
    <View style={styles.container}>
      <Text style={styles.text}> Chat Screen</Text>
      <Text style={styles.text}> {route.params.item.groupName}</Text>
      <Text style={styles.text}> {route.params.item.groupID}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
  },
  text: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ChatScreen;
