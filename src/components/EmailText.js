import React from 'react';
import {TextInput, Text, StyleSheet, View} from 'react-native';
import Colors from '../../utils/Colors';
import Constants from '../const/Constants';
import Connstants from '../const/Constants';
import Strings from '../const/String';

const EmailText = props => {
  const {term, placeHolder, onTermChange, onValidationEmailAddress, error} =
    props;

  return (
    <>
      <Text style={styles.errorText}>{error}</Text>
      <View style={styles.text}>
        <TextInput
          autoCorrect={false}
          style={styles.textInput}
          placeholder={placeHolder}
          value={term}
          onChangeText={onTermChange}
          onEndEditing={onValidationEmailAddress}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    flex: 1,
    marginHorizontal: 20,
  },
  textInput: {
    height: Constants.screenHeight * 0.06,
    width: Constants.screenWidth * 0.85,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 10,
    borderColor: Colors.black,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: Colors.smoke,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: -5,
    marginHorizontal: 20,
  },
});

export default EmailText;
