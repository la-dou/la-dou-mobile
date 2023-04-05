import {View, Text} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

export type TextBubbleProps = {
  type: 'sent' | 'received';
  text: string;
};

const TextBubble: React.FC<TextBubbleProps> = ({type, text}) => {
  const {colors} = useTheme();
  return (
    <View
      style={{
        backgroundColor: type === 'received' ? '#D9D9D9' : colors.border,
        borderRadius: 30,
        borderTopLeftRadius: type === 'received' ? 0 : 30,
        borderTopRightRadius: type === 'received' ? 30 : 0,
        padding: 10,
        margin: 10,
        alignSelf: type === 'received' ? 'flex-start' : 'flex-end',
        maxWidth: '80%',
      }}>
      <Text
        style={{
          fontFamily: 'Montserrat-Medium',
          color: type === 'received' ? colors.border : '#D9D9D9',
          fontSize: 16,
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        {text}
      </Text>
    </View>
  );
};

export default TextBubble;
