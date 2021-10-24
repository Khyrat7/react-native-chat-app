import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TextInput, Alert} from 'react-native';
import Constants from '../const/Constants';
import Colors from '../../utils/Colors';
import Buttons from '../components/Buttons';
import Utility from '../../utils/Utility';
import Strings from '../const/String';
import firestore from '@react-native-firebase/firestore';

const AddGroupScreen = props => {
  const {navigation} = props;
  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState('');

  handleSubmit = () => {
    const isValidText = Utility.isValidField(groupName);
    if (isValidText) {
      setError('');
      firestore().collection('groups').add({
        groupName: {groupName},
      });
      navigation.navigate('GroupsScreen');
    } else {
      setError(Strings.EmptyTextField);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Add Group Screen</Text>
      <Text style={styles.errorText}> {error}</Text>
      <TextInput
        style={styles.textInput}
        autoCorrect={false}
        placeholder={'Enter Group Name'}
        value={groupName}
        onChangeText={text => {
          setGroupName(text);
        }}
        // onEndEditing={evaluateText}
      />

      <Buttons title={'Add Group'} onPress={handleSubmit} />
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
  header: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold',
  },
  textInput: {
    height: Constants.screenHeight * 0.06,
    width: Constants.screenWidth * 0.85,
    marginTop: 5,
    marginBottom: 10,
    borderColor: Colors.black,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: Colors.smoke,
  },
  errorText: {
    fontSize: 12,
    color: Colors.red,
    marginBottom: 5,
    marginHorizontal: 20,
  },
});

export default AddGroupScreen;
