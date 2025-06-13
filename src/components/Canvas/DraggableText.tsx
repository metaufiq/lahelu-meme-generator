/* eslint-disable react-native/no-inline-styles */
// src/components/Canvas/DraggableText.tsx
import React from 'react';
import {Text} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import {TextElement} from '../../types';

interface Props {
  element: TextElement;
  onUpdate: (element: TextElement) => void;
  onSelect: () => void;
}

const DraggableText: React.FC<Props> = ({element, onUpdate, onSelect}) => {
  const translateX = useSharedValue(element.x);
  const translateY = useSharedValue(element.y);

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

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[{position: 'absolute'}, animatedStyle]}>
        <Text
          style={{
            fontSize: element.fontSize,
            color: element.color,
            fontFamily: element.fontFamily,
            fontWeight: 'bold',
          }}>
          {element.text}
        </Text>
      </Animated.View>
    </GestureDetector>
  );
};

export default DraggableText;
