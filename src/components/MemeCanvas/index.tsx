import React, {forwardRef, useCallback} from 'react';
import {View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
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
  onTransformUpdate?: (transform: {
    scale: number;
    translateX: number;
    translateY: number;
  }) => void;
}

const MemeCanvas = forwardRef<View, Props>(
  ({canvasState, onUpdateCanvas, onSelectElement, onTransformUpdate}, ref) => {
    const scale = useSharedValue(1);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const savedTranslateX = useSharedValue(0);
    const savedTranslateY = useSharedValue(0);
    const focalX = useSharedValue(0);
    const focalY = useSharedValue(0);

    // Callback to notify parent of transform changes
    const notifyTransformUpdate = useCallback(
      (
        scaleValue: number,
        translateXValue: number,
        translateYValue: number,
      ) => {
        onTransformUpdate?.({
          scale: scaleValue,
          translateX: translateXValue,
          translateY: translateYValue,
        });
      },
      [onTransformUpdate],
    );

    const pinchGesture = Gesture.Pinch()
      .onStart(event => {
        focalX.value = event.focalX;
        focalY.value = event.focalY;
      })
      .onUpdate(event => {
        scale.value = event.scale;
        // Notify parent of scale change
        runOnJS(notifyTransformUpdate)(
          event.scale,
          translateX.value,
          translateY.value,
        );
      })
      .onEnd(() => {
        const newScale = Math.max(0.5, Math.min(scale.value, 3));
        scale.value = withSpring(newScale);
        // Notify parent of final scale value
        runOnJS(notifyTransformUpdate)(
          newScale,
          translateX.value,
          translateY.value,
        );
      });

    const panGesture = Gesture.Pan()
      .onStart(() => {
        savedTranslateX.value = translateX.value;
        savedTranslateY.value = translateY.value;
      })
      .onUpdate(e => {
        const newTranslateX = savedTranslateX.value + e.translationX;
        const newTranslateY = savedTranslateY.value + e.translationY;

        translateX.value = newTranslateX;
        translateY.value = newTranslateY;

        // Notify parent of translation change
        runOnJS(notifyTransformUpdate)(
          scale.value,
          newTranslateX,
          newTranslateY,
        );
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
      return null;
    }

    return (
      <View style={styles.container}>
        <GestureHandlerRootView>
          <GestureDetector gesture={composedGesture}>
            <Animated.View style={[styles.canvas, animatedStyle]} ref={ref}>
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
  },
);

export default MemeCanvas;
