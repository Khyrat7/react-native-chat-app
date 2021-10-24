import React from 'react';
import {TextInput, Text, StyleSheet, View} from 'react-native';
import Colors from '../../utils/Colors';
import Constants from '../const/Constants';

const PasswordText = props => {
  const {term, placeHolder, onTermChange, onValidatePasswordField, error} =
    props;
  return (
    <View>
      <Text style={styles.errorText}>{error}</Text>
      <View style={styles.text}>
        <TextInput
          style={styles.textInput}
          autoCorrect={false}
          secureTextEntry={true}
          placeholder={placeHolder}
          value={term}
          onChangeText={onTermChange}
          onEndEditing={onValidatePasswordField}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    // flex: 1,
    marginHorizontal: 20,
  },
  textInput: {
    height: Constants.screenHeight * 0.06,
    width: Constants.screenWidth * 0.85,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 40,
    borderColor: Colors.black,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: Colors.smoke,
  },
  errorText: {
    fontSize: 16,
    color: Colors.red,
    marginBottom: -5,
    marginHorizontal: 20,
  },
});

export default PasswordText;
