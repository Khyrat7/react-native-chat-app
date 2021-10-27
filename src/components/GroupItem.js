import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import Constants from '../const/Constants';
import Colors from '../../utils/Colors';
import Images from '../const/Images';
import {isTemplateElement} from '@babel/types';
import {TextInput} from 'react-native-gesture-handler';

GroupItem = props => {
  const {item} = props;

  return (
    <View>
      <View style={styles.container}>
        <Image style={styles.image} source={Images.group} />
        <View style={styles.textContainer}>
          <Text style={styles.groupTitle}>{item.groupName}</Text>
          <Text style={styles.groupMembers}>{item.groupID}</Text>
        </View>
      </View>
      <Text style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    width: Constants.screenWidth,
    margin: 10,
  },
  descrptionContainer: {
    margin: 5,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    shadowColor: Colors.gray,
    shadowOffset: {height: 1, width: 1},
    shadowRadius: 2,
    backgroundColor: Colors.theme,
  },
  groupTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    // marginHorizontal: 10,
    marginBottom: 5,
  },
  groupMembers: {
    color: Colors.white,
    fontSize: 14,
  },
  separator: {
    height: 2,
    width: Constants.screenWidth,
    backgroundColor: Colors.white,
  },
  textContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 20,
  },
});

export default GroupItem;
