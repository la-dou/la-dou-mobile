import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import PrimaryTheme from '../theme/Primary';

export type MenuButtonProps = {
  iconSource: any;
  text: string;
  primary?: boolean;
  onPress?: () => void;
};

const MenuButton: React.FC<MenuButtonProps> = ({
  iconSource,
  text,
  onPress,
  primary,
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: PrimaryTheme.colors.card,
        borderRadius: 5,
        marginVertical: 10,
        // add a radial gradient here https://stackoverflow.com/questions/56238356/whats-the-best-way-to-add-a-radial-gradient-to-a-react-native-view
        borderColor: '#CB4B47',
        borderWidth: 1,
        width: primary ? '47%' : '100%',
        height: primary ? '40%' : '15%',
      }}
      onPress={onPress}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          flexDirection: primary ? 'column' : 'row',
        }}>
        <Image
          style={{
            width: primary ? 85 : 40,
            height: primary ? 85 : 40,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
          source={iconSource}
        />
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-Medium',
              color: PrimaryTheme.colors.primary,
              fontSize: 20,
              lineHeight: 30,
              textAlign: 'center',
              margin: 10,
            }}>
            {text}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MenuButton;
