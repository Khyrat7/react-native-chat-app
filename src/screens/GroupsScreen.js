import React, {useLayoutEffect, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import ButtonWithBackGround from '../components/ButtonWithBackground';
import Images from '../const/Images';
import auth from '@react-native-firebase/auth';
import Colors from '../../utils/Colors';
import GroupItem from '../components/GroupItem';
import firestore from '@react-native-firebase/firestore';
import Constants from '../const/Constants';

const GroupsScreen = props => {
  const {navigation} = props;
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchGroupsData();
  }, []);

  function fetchGroupsData() {
    const groupsArray = [];
    try {
      firestore()
        .collection('groups')
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
              groupsArray.push(change.doc.data());
            } else if (change.type === 'modified') {
              groupsArray.push(change.doc.data());
            }
            setGroups(groupsArray);
          });
        });
    } catch (error) {
      console.log(error);
    }
  }

  useLayoutEffect(() => {
    // setting the navigation bar
    navigation.setOptions({
      headerRight: () => (
        <ButtonWithBackGround
          onPress={() => {
            navigation.navigate('AddGroupScreen');
          }}
          image={Images.add}
        />
      ),

      headerLeft: () => (
        <ButtonWithBackGround
          onPress={() => {
            signoutUser();
          }}
          image={Images.logout}
        />
      ),
    });
  });

  signoutUser = async () => {
    try {
      await auth().signOut();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}> Groups Screen</Text> */}
      <FlatList
        style={styles.flatList}
        data={groups}
        keyExtractor={(item, index) => 'key' + index}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ChatScreen', {item});
              }}>
              <GroupItem item={item} />
            </TouchableOpacity>
          );
        }}></FlatList>
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
  },
  flatList: {
    width: Constants.screenWidth,
    flex: 1,
  },
});

export default GroupsScreen;
