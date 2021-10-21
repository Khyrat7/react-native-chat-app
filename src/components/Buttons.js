import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import Colors from '../../utils/Colors';
import Constants from '../const/Constants';

const Buttons = props => {
  const {title, onPress} = props;

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    height: 50,
    width: '60%',
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    backgroundColor: Colors.uaStudiosGreen,
    shadowColor: Colors.uaStudiosGreen,
    shadowOpacity: 0.5,
    shadowOffset: {height: 10, width: 10},
    shadowRadius: 20,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: Colors.white,
  },
});

export default Buttons;
