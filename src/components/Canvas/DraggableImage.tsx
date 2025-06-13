// src/components/Canvas/DraggableImage.tsx
import React from 'react';
import {Image} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import {ImageElement} from '../../types';

interface Props {
  element: ImageElement;
  onUpdate: (element: ImageElement) => void;
  onSelect: () => void;
}

export const DraggableImage: React.FC<Props> = ({
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
        <Image
          source={{uri: element.uri}}
          style={{
            width: element.width,
            height: element.height,
            opacity: element.opacity,
          }}
          resizeMode="contain"
        />
      </Animated.View>
    </PanGestureHandler>
  );
};
