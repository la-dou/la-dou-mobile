import {View, TouchableWithoutFeedback, Animated, Image} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

export type RatingButtonProps = {
  getRating: (rating: number) => void;
};

const RatingButton: React.FC<RatingButtonProps> = (
  props: RatingButtonProps,
) => {
  const {colors} = useTheme();
  const starRatingOptions = [1, 2, 3, 4, 5];
  const [starRating, setStarRating] = React.useState(0);
  const animatedButtonScale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1.2,
      useNativeDriver: true,
      speed: 50,
      bounciness: 5,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 5,
    }).start();
  };
  const animatedScaleStyle = {
    transform: [{scale: animatedButtonScale}],
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
      }}>
      {starRatingOptions.map(option => (
        <TouchableWithoutFeedback
          onPressIn={() => handlePressIn()}
          onPressOut={() => handlePressOut()}
          onPress={() => {
            setStarRating(option);
            props.getRating(option);
          }}
          key={option}>
          <Animated.View style={animatedScaleStyle}>
            <Image
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                // backgroundColor: starRating >= option ? '#591028' : '#262626',
                width: 30,
                height: 30,
              }}
              // source={require(`../assets/images/star-${
              //   starRating >= option ? 'outline' : 'filled'
              // }.png`)}
              source={
                starRating >= option
                  ? require('../assets/images/star-filled.png')
                  : require('../assets/images/star-outline.png')
              }
            />
          </Animated.View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};

export default RatingButton;
