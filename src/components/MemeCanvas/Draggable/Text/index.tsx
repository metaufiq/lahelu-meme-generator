import React from 'react';
import {Text, View, Dimensions} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';

import {TextElement} from '../../../../types';
import useStyles from './styles';

interface Props {
  element: TextElement;
  onUpdate: (element: TextElement) => void;
  onSelect: () => void;
  containerWidth?: number; // Optional container width for percentage calculations
}

const DraggableText: React.FC<Props> = ({
  element,
  onUpdate,
  onSelect,
  containerWidth,
}) => {
  const styles = useStyles();
  const translateX = useSharedValue(element.x);
  const translateY = useSharedValue(element.y);

  // Get screen width as fallback if containerWidth is not provided
  const screenWidth = Dimensions.get('window').width;
  const baseWidth = containerWidth || screenWidth;

  const panGesture = Gesture.Pan()
    .onStart(() => {
      runOnJS(onSelect)();
    })
    .onUpdate(e => {
      translateX.value = element.x + e.translationX;
      translateY.value = element.y + e.translationY;
    })
    .onEnd(() => {
      runOnJS(onUpdate)({
        ...element,
        x: translateX.value,
        y: translateY.value,
      });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: translateX.value},
      {translateY: translateY.value},
      {scale: element.scale},
      {rotate: `${element.rotation}deg`},
    ],
  }));

  // Calculate actual width from percentage
  const actualWidth = element.width
    ? (element.width / 100) * baseWidth
    : undefined;

  const textContainerStyle = [
    styles.textContainer,
    element.backgroundColor
      ? element.backgroundColor !== 'transparent' && {
          backgroundColor: element.backgroundColor,
        }
      : undefined,
    // Apply width constraint if specified
    actualWidth
      ? {
          width: actualWidth,
        }
      : undefined,
  ];

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[animatedStyle, styles.container]}>
        <View style={textContainerStyle}>
          <Text
            style={[
              {
                fontSize: element.fontSize,
                color: element.color,
                fontFamily: element.fontFamily,
              },
              styles.text,
            ]}>
            {element.text}
          </Text>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

export default DraggableText;
