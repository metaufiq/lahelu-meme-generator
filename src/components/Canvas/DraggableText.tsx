// src/components/Canvas/DraggableText.tsx
import React from 'react';
import {Text} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
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

export const DraggableText: React.FC<Props> = ({
  element,
  onUpdate,
  onSelect,
}) => {
  const translateX = useSharedValue(element.x);
  const translateY = useSharedValue(element.y);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      runOnJS(onSelect)();
    },
    onActive: event => {
      translateX.value = element.x + event.translationX;
      translateY.value = element.y + event.translationY;
    },
    onEnd: () => {
      runOnJS(onUpdate)({
        ...element,
        x: translateX.value,
        y: translateY.value,
      });
    },
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
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[{position: 'absolute'}, animatedStyle]}>
        <Text
          style={{
            fontSize: element.fontSize,
            color: element.color,
            fontFamily: element.fontFamily,
            fontWeight: 'bold',
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: {width: 2, height: 2},
            textShadowRadius: 10,
          }}>
          {element.text}
        </Text>
      </Animated.View>
    </PanGestureHandler>
  );
};
