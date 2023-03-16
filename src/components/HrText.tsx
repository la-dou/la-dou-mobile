import {Text, View} from 'react-native';
import React from 'react';

export type HrTextProps = {
  children: string;
  hrColor: string;
  textStyle?: any;
};

const HrText: React.FC<HrTextProps> = ({children, hrColor, textStyle}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1, height: 1, backgroundColor: hrColor}} />
      <View>
        <Text
          style={[
            {padding: 10, fontFamily: 'Montserrat-Medium', fontSize: 16},
            textStyle,
          ]}>
          {children}
        </Text>
      </View>
      <View style={{flex: 1, height: 1, backgroundColor: hrColor}} />
    </View>
  );
};

export default HrText;
