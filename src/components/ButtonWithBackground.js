import React from 'react';
import {TouchableOpacity, StyleSheet, Image, View} from 'react-native';

const ButtonWithBackGround = props => {
  const {onPress, image} = props;

  return (
    <View style={styles.button}>
      <TouchableOpacity onPress={onPress}>
        <Image source={image} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  image: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
});

export default ButtonWithBackGround;
