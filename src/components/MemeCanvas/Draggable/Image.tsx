// src/components/Canvas/DraggableImage.tsx
import React from 'react';
import {Image} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import {ImageElement} from '../../../types';

interface Props {
  element: ImageElement;
  onUpdate: (element: ImageElement) => void;
  onSelect: () => void;
}

const DraggableImage: React.FC<Props> = ({element, onUpdate, onSelect}) => {
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
      <Animated.View style={[animatedStyle]} className={'absolute'}>
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
    </GestureDetector>
  );
};

export default DraggableImage;
