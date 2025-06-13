// src/components/Canvas/MemeCanvas.tsx
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PinchGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Svg, {Image as SvgImage} from 'react-native-svg';
import {CanvasState} from '../../types';
import {DraggableText} from './DraggableText';
import {DraggableImage} from './DraggableImage';

interface Props {
  canvasState: CanvasState;
  onUpdateCanvas: (state: Partial<CanvasState>) => void;
  onSelectElement: (id: string, type: 'text' | 'image') => void;
}

export const MemeCanvas: React.FC<Props> = ({
  canvasState,
  onUpdateCanvas,
  onSelectElement,
}) => {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const focalX = useSharedValue(0);
  const focalY = useSharedValue(0);

  const panGestureHandler = useAnimatedGestureHandler({
    onStart: () => {},
    onActive: event => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    },
    onEnd: () => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    },
  });

  const pinchGestureHandler = useAnimatedGestureHandler({
    onStart: event => {
      focalX.value = event.focalX;
      focalY.value = event.focalY;
    },
    onActive: event => {
      scale.value = event.scale;
    },
    onEnd: () => {
      scale.value = withSpring(Math.max(0.5, Math.min(scale.value, 3)));
    },
  });

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
        <PanGestureHandler onGestureEvent={panGestureHandler}>
          <Animated.View>
            <PinchGestureHandler onGestureEvent={pinchGestureHandler}>
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
            </PinchGestureHandler>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  canvas: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emptyCanvas: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
