import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PrimaryTheme from '../theme/Primary';
import {useTheme} from '@react-navigation/native';

export type InfoCardProps = {
  data: [
    {
      title: string;
      data: string;
    },
    {
      title: string;
      data: string;
    },
    {
      title: string;
      data: string;
    },
    {
      title: string;
      data: string;
    },
  ];
};

const InfoCard: React.FC<InfoCardProps> = ({data}) => {
  const {colors} = useTheme();

  return (
    <View
      style={{
        width: '100%',
        borderColor: '#CB4B47',
        borderWidth: 1,
        borderRadius: 5,
        padding: '3%',
        marginVertical: '2.5%',
        backgroundColor: colors.card,
      }}>
      {[0, 1].map(i => (
        <View style={{flexDirection: 'row'}} key={i}>
          {[0, 1].map(j => (
            <View
              style={{
                flex: 0.5,
                flexDirection: 'row',
                marginVertical: '2.5%',
                marginRight: '2.5%',
              }}
              key={i + j}>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  color: colors.primary,
                  fontSize: 13,
                }}>
                {data[i * 2 + j].title}
              </Text>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  color: PrimaryTheme.colors.primary,
                  flex: 1,
                  fontSize: 13,
                }}
                numberOfLines={1}>
                {data[i * 2 + j].data}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default InfoCard;
