import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ImageStore,
} from 'react-native';
// import  from "react-native"
import Buttons from '../components/Buttons';
import Strings from '../const/String';
import Colors from '../../utils/Colors';
import Images from '../const/Images';
import EmailText from '../components/EmailText';
import Constants from '../const/Constants';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  handlePress = () => {
    console.log('final mail : ' + email);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}> Sign In Screen</Text>
      <Image source={Images.logo} style={styles.logo} />

      <EmailText
        placeHolder={Strings.EmailPlaceHolder}
        term={email}
        onTermChange={text => {
          setEmail(text);
          console.log('New Email : ' + email);
        }}
      />
      <Buttons title={Strings.Join} onPress={handlePress}></Buttons>
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
    marginTop: Constants.screenHeight * 0.1,
  },
  logo: {
    width: '60%',
    height: '30%',
    alignContent: 'center',
  },
});

export default SignInScreen;
