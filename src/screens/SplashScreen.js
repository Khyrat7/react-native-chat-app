import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import Images from '../const/Images';
import Colors from '../../utils/Colors';
import auth from '@react-native-firebase/auth';
import LottieView from 'lottie-react-native';
import Constatnts from '../const/Constants';

const SplashScreen = props => {
  const {navigation} = props;

  useEffect(() => {
    console.log('Splash Screen active!!!!!');
    checkAuth();
  }, [navigation]);

  function checkAuth() {
    setTimeout(() => {
      try {
        auth().onAuthStateChanged(user => {
          if (user != null) {
            navigation.reset({
              index: 0,
              routes: [{name: 'GroupsScreen'}],
            });
          } else {
            navigation.reset({
              index: 0,
              routes: [{name: 'SignInScreen'}],
            });
          }
        });
      } catch (e) {
        console.log(e);
      }
    }, 5000);
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={Images.logo} />
      <View style={styles.lottiView}>
        <LottieView
          source={require('../../assets/working.json')}
          autoPlay
          loop></LottieView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lottiView: {
    width: '100%',
    height: 0.6 * Constatnts.screenHeight,
  },
  container: {
    backgroundColor: Colors.black,
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  image: {
    width: 300,
    height: 300,
  },
});

export default SplashScreen;
