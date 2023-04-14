import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

export type BackButtonProps = {
  style?: any;
};

const BackButton: React.FC<BackButtonProps> = ({style}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
      style={{
        position: 'absolute',
        top: 30,
        left: 20,
        width: 32,
        height: 32,
      }}>
      <Image
        style={[
          {
            width: 24,
            height: 24,
          },
          style,
        ]}
        source={require('../assets/images/back-arrow.png')}
      />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({});
