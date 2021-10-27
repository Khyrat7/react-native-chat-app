import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import Colors from '../../utils/Colors';
import Constants from '../const/Constants';
import Utility from '../../utils/Utility';
import Strings from '../const/String';
import DismissKeyboard from '../components/DismissKeyboard';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import MessageItem from '../components/MessageItem';
import LottieView from 'lottie-react-native';
import {set} from 'react-native-reanimated';

const ChatScreen = props => {
  const {navigation, route} = props;
  const {item} = route.params;
  const userID = auth().currentUser.uid;

  // Hooks
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    console.log('The Chat Room Details : ', item);
    getJoiningStatus();
    getMessages();
  }, []);

  // functions

  // get user joining status

  const getJoiningStatus = () => {
    firestore()
      .collection('group members')
      .doc(item.groupID)
      .collection('member')
      .where('userID', '==', userID)
      .get()
      .then(snapshot => {
        // console.log(snapshot.docs.data());
        if (snapshot.size > 0) {
          setIsJoined(true);
        } else {
          setIsJoined(false);
          showJoiningAlert();
        }
      })
      .catch(error => {
        console.log('Error while getting user joining status : ', error);
      });
  };

  // show Joining alert
  const showJoiningAlert = () => {
    Alert.alert('Join Chat', 'Do you want to join this chat room', [
      {
        text: 'Yes',
        onPress: () => {
          joinGroup();
          setIsJoined(true);
        },
      },
      {
        text: 'No',
        onPress: () => {
          navigation.goBack();
        },
      },
    ]);
  };

  // add user to chat userslist

  const joinGroup = () => {
    firestore()
      .collection('group members')
      .doc(item.groupID)
      .collection('member')
      .doc(userID)
      .set({userID: userID})
      .then(doc => {
        setIsJoined(true);
        Alert.alert('user added to chat room');
      })
      .catch(error => {
        setIsJoined(false);
        console.log('Error while adding user to chat users : ', error);
      });
  };

  // upload message to firestore
  const sendMessageToChat = () => {
    const messageRef = firestore()
      .collection('messages')
      .doc(item.groupID)
      .collection('message')
      .doc();
    const userEmail = auth().currentUser.email;
    messageRef
      .set({
        messageID: messageRef.id,
        message: message,
        senderID: userID,
        senderEmail: userEmail,
        messageTime: new Date(),
      })
      .then(docRef => {
        console.log('Document written with ID : ' + messageRef.id);
        setMessage('');
      })
      .catch(error => {
        Alert.alert(error.message);
        console.log('Error : ', error);
      });
  };

  // get messages list
  const getMessages = () => {
    const messages = [];
    firestore()
      .collection('messages')
      .doc(item.groupID)
      .collection('message')
      .orderBy('messageTime')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            console.log('New Message: ', change.doc.data());
            messages.push(change.doc.data());
          } else if (change.type === 'modified') {
            console.log('Modified Message: ', change.doc.data());
          } else if (change.type === 'removed') {
            console.log('Removed Message: ', change.doc.data());
          }
          setMessageList(messages);
        });
      });
  };

  // Validate text
  function isValidText() {
    const textValid = Utility.isValidField(message);
    if (!textValid) {
      setError(Strings.EmptyMessage);
    } else {
      setError('');
    }
    return textValid;
  }

  // handle button pressed
  const onSubmit = () => {
    sendMessageToChat();
  };

  const chatView = () => {
    return (
      <DismissKeyboard>
        <KeyboardAvoidingView
          style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}
          behavior="padding"
          enabled
          keyboardVerticalOffset={100}>
          <View style={styles.container}>
            <FlatList
              // making the content of the flat list focus on tht bottom of the list by default
              inverted
              contentContainerStyle={{flexDirection: 'column-reverse'}}
              //_______________________________________________________________________________
              style={styles.flatList}
              data={messageList}
              keyExtractor={(item, index) => 'key' + index}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity onPress={() => {}}>
                    <MessageItem item={item} />
                  </TouchableOpacity>
                );
              }}
            />

            {error ? (
              <Text style={{color: Colors.red, backgroundColor: Colors.black}}>
                {error}
              </Text>
            ) : null}
            <View style={styles.mfFieldView}>
              <TextInput
                style={styles.mfTextField}
                autoCorrect={false}
                placeholder={Strings.EmptyMessagePlaceHolder}
                value={message}
                onChangeText={text => {
                  setMessage(text);
                  isValidText();
                }}
                onEndEditing={() => {
                  isValidText();
                }}
              />
              <Button
                style={styles.mfButton}
                title={Strings.Send}
                color={Colors.white}
                onPress={() => {
                  onSubmit();
                }}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </DismissKeyboard>
    );
  };

  const joinView = () => {
    return (
      <View style={styles.lottiView}>
        <LottieView
          source={require('../../assets/joinChat.json')}
          autoPlay
          loop
        />
      </View>
    );
  };
  return isJoined ? chatView() : joinView();
};

const styles = StyleSheet.create({
  lottiView: {
    width: '100%',
    height: 0.6 * Constants.screenHeight,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: Colors.black,
  },
  flatList: {
    marginBottom: 10,
    flex: 0.9,
  },

  mfContainer: {
    backgroundColor: Colors.white,
    width: Constants.screenWidth,
    justifyContent: 'space-between',
  },
  mfFieldView: {
    flex: 0.1,
    flexDirection: 'row',
    backgroundColor: Colors.uaStudiosGreen,
  },
  mfTextField: {
    fontSize: 14,
    flex: 1,
    marginRight: 10,
    paddingLeft: 10,
    width: '75%',
    borderColor: Colors.gray,
    borderWidth: 1,
    justifyContent: 'center',
    backgroundColor: Colors.smoke,
  },
  mfButton: {
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1,
    alignSelf: 'center',
    width: '25%',
    height: '100%',
  },
});

export default ChatScreen;
