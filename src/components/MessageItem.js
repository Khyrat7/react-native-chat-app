import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import Constants from '../const/Constants';
import Images from '../const/Images';
import Colors from '../../utils/Colors';
import auth from '@react-native-firebase/auth';
import {TextInput} from 'react-native-gesture-handler';

const MessageItem = props => {
  const {item} = props;
  const userID = auth().currentUser.uid;
  if (userID === item.senderID) {
    return (
      <View style={styles.myMessageContainerView}>
        <Text style={styles.senderName}>{item.senderEmail}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.otherMessageContainerView}>
        <Text style={styles.senderName}>{item.senderEmail}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  otherMessageContainerView: {
    width: Constants.screenWidth - 50,
    backgroundColor: Colors.red,
    borderRadius: 5,
    marginRight: 50,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
  },
  myMessageContainerView: {
    width: Constants.screenWidth - 50,
    backgroundColor: Colors.gray,
    borderRadius: 5,
    marginLeft: 50,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
  },
  senderName: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  message: {
    color: Colors.white,
    fontSize: 14,
  },
});

export default MessageItem;
