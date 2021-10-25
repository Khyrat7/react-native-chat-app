import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';

import Buttons from '../components/Buttons';
import Strings from '../const/String';
import Colors from '../../utils/Colors';
import Images from '../const/Images';
import EmailText from '../components/EmailText';
import PasswordText from '../components/PasswordText';
import Constants from '../const/Constants';
import DismissKeyboard from '../../src/components/DismissKeyboard';
import Utility from '../../utils/Utility';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignInScreen = props => {
  const {navigation} = props;
  // Hooks
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Email Validation Function
  validateEamil = () => {
    const isValidEmail = Utility.isEmailValid(email);
    isValidEmail
      ? setEmailError('')
      : setEmailError(Strings.InvalidEmailAddress);
    return isValidEmail;
  };

  // Passwor Validation Function
  validatePassword = () => {
    const isValidPassword = Utility.isValidField(password);
    isValidPassword
      ? setPasswordError('')
      : setPasswordError(Strings.PasswordFieldEmpty);
    return isValidPassword;
  };

  handlePress = () => {
    // console.log('final mail : ' + email);
    // console.log('final password : ' + password);
    registration(email, password);
  };

  registration = (email, password) => {
    try {
      setIsLoading(true);
      // signing in and existing user
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(user => {
          setIsLoading(false);
          console.log(
            'User UID : ' + user.user.uid + ' Logged in Successfully.',
          );
          // reseting the navigation routes to not include the logging page
          navigation.reset({
            index: 0,
            routes: [{name: 'GroupsScreen'}],
          });
        })
        // in case of error that means that the user is new
        // creating new user
        .catch(error => {
          auth()
            .createUserWithEmailAndPassword(email, password)
            .then(user => {
              setIsLoading(false);
              // Adding the new user to the firestore users collection with the same uid
              firestore().collection('users').doc(user.user.uid).set({
                email: user.user.email,
              });

              // reseting the navigation routes to not include the logging page
              navigation.reset({
                index: 0,
                routes: [{name: 'GroupsScreen'}],
              });
              console.log(
                'New User ' +
                  user.user.email +
                  ' Created Successfully \n User UID : ' +
                  user.user.uid,
              );
            })
            .catch(error => {
              setIsLoading(false);
              console.log('error');
              Alert.alert(error.message);
            });
        });
    } catch (error) {
      setIsLoading(false);
      Alert.alert(error.message);
    }
  };

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <SafeAreaView>
          <Image style={styles.logo} source={Images.logo} />
          <Text style={styles.text}>Email:</Text>
          <EmailText
            error={emailError}
            placeHolder={Strings.EmailPlaceHolder}
            term={email}
            onTermChange={text => {
              setEmail(text);
              // console.log('New Email : ' + email);
            }}
            onValidationEmailAddress={validateEamil}
          />
          <Text style={styles.text}>Password:</Text>

          <PasswordText
            error={passwordError}
            placeHolder={Strings.PasswordPlaceHolder}
            term={password}
            onTermChange={text => {
              setPassword(text);
              // console.log('Entered Password : ' + password);
            }}
            onValidatePasswordField={validatePassword}
          />
          <View style={{alignItems: 'center'}}>
            <Buttons
              title={Strings.Join}
              onPress={handlePress}
              isLoading={isLoading}
            />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
  },
  logo: {
    alignSelf: 'center',
    height: Constants.screenHeight * 0.3,
    width: Constants.screenWidth * 0.5,
    margin: 0.04 * Constants.screenHeight,
  },
  text: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default SignInScreen;
