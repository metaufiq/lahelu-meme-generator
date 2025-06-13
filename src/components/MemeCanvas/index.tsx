// src/components/Canvas/MemeCanvas.tsx
import React from 'react';
import {View, Text} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Svg, {Image as SvgImage} from 'react-native-svg';

import {CanvasState} from '../../types';
import DraggableText from './Draggable/Text';
import DraggableImage from './Draggable/Image';
import styles from './style';

interface Props {
  canvasState: CanvasState;
  onUpdateCanvas: (state: Partial<CanvasState>) => void;
  onSelectElement: (id: string, type: 'text' | 'image') => void;
}

const MemeCanvas: React.FC<Props> = ({
  canvasState,
  onUpdateCanvas,
  onSelectElement,
}) => {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const pinchGesture = Gesture.Pinch()
    .onStart(event => {
      focalX.value = event.focalX;
      focalY.value = event.focalY;
    })
    .onUpdate(event => {
      scale.value = event.scale;
    })
    .onEnd(() => {
      scale.value = withSpring(Math.max(0.5, Math.min(scale.value, 3)));
    });

  const panGesture = Gesture.Pan()
    .onStart(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    })
    .onUpdate(e => {
      translateX.value = savedTranslateX.value + e.translationX;
      translateY.value = savedTranslateY.value + e.translationY;
    });

  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: translateX.value},
      {translateY: translateY.value},
      {scale: scale.value},
    ],
  }));

  if (!canvasState.template) {
    return (
      <View style={styles.emptyCanvas}>
        <Text>Select a template to start creating your meme</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <GestureDetector gesture={composedGesture}>
          <Animated.View style={[styles.canvas, animatedStyle]}>
            <Svg
              width={canvasState.template.width}
              height={canvasState.template.height}
              viewBox={`0 0 ${canvasState.template.width} ${canvasState.template.height}`}>
              <SvgImage
                href={canvasState.template.url}
                width={canvasState.template.width}
                height={canvasState.template.height}
              />
            </Svg>

            {canvasState.textElements.map(textElement => (
              <DraggableText
                key={textElement.id}
                element={textElement}
                onUpdate={updatedElement => {
                  const updatedTexts = canvasState.textElements.map(t =>
                    t.id === updatedElement.id ? updatedElement : t,
                  );
                  onUpdateCanvas({textElements: updatedTexts});
                }}
                onSelect={() => onSelectElement(textElement.id, 'text')}
              />
            ))}

            {canvasState.imageElements.map(imageElement => (
              <DraggableImage
                key={imageElement.id}
                element={imageElement}
                onUpdate={updatedElement => {
                  const updatedImages = canvasState.imageElements.map(i =>
                    i.id === updatedElement.id ? updatedElement : i,
                  );
                  onUpdateCanvas({imageElements: updatedImages});
                }}
                onSelect={() => onSelectElement(imageElement.id, 'image')}
              />
            ))}
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
};

export default MemeCanvas;
