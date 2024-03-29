import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import PrimaryTheme from '../theme/Primary';
import BackButton from '../components/BackButton';
import TextBubble from '../components/TextBubble';
import {useRecoilState} from 'recoil';
import {authToken as authTokenATom} from '../atoms';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../navigation/MainStack';
import {WSS_URL} from '../utils/constants';

type Messages = {
  type: 'sent' | 'received';
  text: string;
};

type ChatProps = NativeStackScreenProps<MainStackParamList, 'Chat'>;
const Chat: React.FC<ChatProps> = ({route}) => {
  const [messages, setMessages] = React.useState<Messages[]>([]);
  const [message, setMessage] = React.useState('');
  const [webSocket, setWebSocket] = React.useState<WebSocket | null>(null);
  const [authToken, setUserDetails] = useRecoilState(authTokenATom);

  const handleSendMessage = () => {
    if (message) {
      setMessages(messages => [...messages, {type: 'sent', text: message}]);
      setMessage('');
      webSocket?.send(message);
    }
  };

  useEffect(() => {
    const toSendTo = route.params?.guest_roll_no;
    const ws = new WebSocket(`${WSS_URL}/chat/${authToken}/${toSendTo}`);
    setWebSocket(ws);

    ws.onopen = () => {
      console.log('connected');
    };

    ws.onmessage = e => {
      console.log('received message', e.data);
      setMessages(messages => [...messages, {type: 'received', text: e.data}]);
    };

    ws.onerror = e => {
      console.log(e.message);
    };

    ws.onclose = e => {
      console.log(e.code, e.reason);
    };
    console.log('here');

    // close the connection when the page is closed
    return () => ws.close();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton style={styles.BackButton} />
        <Text style={styles.name}>{String(route.params?.guest_roll_no)}</Text>
        <Image
          source={require('../assets/images/call-icon.png')}
          style={styles.callIcon}
        />
      </View>
      <ScrollView style={styles.chatBody}>
        {messages.map((message, index) => (
          <TextBubble key={index} type={message.type} text={message.text} />
        ))}
      </ScrollView>
      <View style={styles.sendMessageBox}>
        <TextInput
          style={styles.sendMessageText}
          placeholder="Type something..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity
          style={styles.sendMessageButton}
          onPress={handleSendMessage}>
          <Image
            source={require('../assets/images/send-icon.png')}
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: PrimaryTheme.colors.card,
    height: 60,
    width: '100%',
    flexDirection: 'row',
  },
  BackButton: {
    top: 20,
  },
  name: {
    position: 'absolute',
    top: 16,
    left: 80,
    fontFamily: 'Montserrat-SemiBold',
    color: PrimaryTheme.colors.primary,
    fontSize: 22,
  },
  callIcon: {
    position: 'absolute',
    top: 17,
    right: 20,
    width: 28,
    height: 28,
  },
  chatBody: {},
  sendMessageBox: {
    backgroundColor: PrimaryTheme.colors.primary,
    height: 60,
    width: '90%',
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 20,
    borderRadius: 6,
    flexDirection: 'row',
  },
  sendMessageText: {
    fontFamily: 'Montserrat-Medium',
    color: PrimaryTheme.colors.card,
    fontSize: 16,
    height: 60,
    paddingLeft: 20,
    paddingRight: 20,
    marginRight: 60,
    width: '85%',
  },
  sendMessageButton: {
    backgroundColor: PrimaryTheme.colors.border,
    height: 50,
    width: 50,
    borderRadius: 5,
    marginLeft: 'auto',
    alignSelf: 'center',
    marginRight: 10,
  },
  sendIcon: {
    width: 30,
    height: 50,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});
