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
// import  from "react-native"
import Buttons from '../components/Buttons';
import Strings from '../const/String';
import Colors from '../../utils/Colors';
import Images from '../const/Images';
import EmailText from '../components/EmailText';
import PasswordText from '../components/PasswordText';
import Constants from '../const/Constants';
import DismissKeyboard from '../../src/components/DismissKeyboard';
import Utility from '../../utils/Utility';

const SignInScreen = () => {
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
    console.log('final mail : ' + email);
    console.log('final password : ' + password);
  };

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <SafeAreaView>
          <Image style={styles.logo} source={Images.logo} />
          <EmailText
            error={emailError}
            placeHolder={Strings.EmailPlaceHolder}
            term={email}
            onTermChange={text => {
              setEmail(text);
              console.log('New Email : ' + email);
            }}
            onValidationEmailAddress={validateEamil}
          />
          <PasswordText
            error={passwordError}
            placeHolder={Strings.PasswordPlaceHolder}
            term={password}
            onTermChange={text => {
              setPassword(text);
              console.log('Entered Password : ' + password);
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
});

export default SignInScreen;
