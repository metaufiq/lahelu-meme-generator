import React, {FC, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';

import {CanvasState, ImageElement, TextElement} from '../../types';
import TextControls from '../TextControls';
import ImageControls from '../ImageControls';
import {Button} from '../Button';

interface BottomControlsProps {
  selectedElementId: string | null;
  selectedElementType: 'text' | 'image' | null;
  canvasState: CanvasState;
  onUpdateCanvas: (updates: Partial<CanvasState>) => void;
  onClearSelection: () => void;
}

const BottomControls: FC<BottomControlsProps> = ({
  selectedElementId,
  selectedElementType,
  canvasState,
  onUpdateCanvas,
  onClearSelection,
}) => {
  // Animation values
  const bottomBarHeight = useSharedValue(120);
  const addElementsOpacity = useSharedValue(1);
  const addElementsTranslateY = useSharedValue(0);
  const controlsOpacity = useSharedValue(0);
  const controlsTranslateY = useSharedValue(20);
  const buttonScale1 = useSharedValue(1);
  const buttonScale2 = useSharedValue(1);

  // Animate bottom bar when selection changes
  useEffect(() => {
    if (selectedElementId) {
      // Switch to controls view
      bottomBarHeight.value = withSpring(
        selectedElementType === 'text' ? 300 : 350,
        {damping: 15, stiffness: 100},
      );
      addElementsOpacity.value = withTiming(0, {duration: 200});
      addElementsTranslateY.value = withTiming(-10, {duration: 200});
      controlsOpacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.quad),
      });
      controlsTranslateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.quad),
      });
    } else {
      // Switch to add elements view
      bottomBarHeight.value = withSpring(120, {damping: 15, stiffness: 100});
      controlsOpacity.value = withTiming(0, {duration: 200});
      controlsTranslateY.value = withTiming(20, {duration: 200});
      addElementsOpacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.quad),
      });
      addElementsTranslateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.quad),
      });
    }
  }, [
    addElementsOpacity,
    addElementsTranslateY,
    bottomBarHeight,
    controlsOpacity,
    controlsTranslateY,
    selectedElementId,
    selectedElementType,
  ]);

  const addText = () => {
    buttonScale1.value = withSpring(0.9, {damping: 10}, () => {
      buttonScale1.value = withSpring(1, {damping: 8});
    });

    const newText: TextElement = {
      id: Date.now().toString(),
      text: 'Your text here',
      x: 50,
      y: 50,
      fontSize: 24,
      color: '#FFFFFF',
      fontFamily: 'Arial',
      rotation: 0,
      scale: 1,
    };

    onUpdateCanvas({
      textElements: [...canvasState.textElements, newText],
    });
  };

  const addImage = () => {
    buttonScale2.value = withSpring(0.9, {damping: 10}, () => {
      buttonScale2.value = withSpring(1, {damping: 8});
    });

    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets[0]) {
        const asset = response.assets[0];
        const newImage: ImageElement = {
          id: Date.now().toString(),
          uri: asset.uri!,
          x: 50,
          y: 50,
          width: 100,
          height: 100,
          rotation: 0,
          scale: 1,
          opacity: 1,
        };

        onUpdateCanvas({
          imageElements: [...canvasState.imageElements, newImage],
        });
      }
    });
  };

  const selectedTextElement = canvasState.textElements.find(
    t => t.id === selectedElementId,
  );

  const selectedImageElement = canvasState.imageElements.find(
    i => i.id === selectedElementId,
  );

  // Animated styles
  const bottomBarAnimatedStyle = useAnimatedStyle(() => ({
    height: bottomBarHeight.value,
  }));

  const addElementsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: addElementsOpacity.value,
    transform: [{translateY: addElementsTranslateY.value}],
  }));

  const controlsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: controlsOpacity.value,
    transform: [{translateY: controlsTranslateY.value}],
  }));

  const button1AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: buttonScale1.value}],
  }));

  const button2AnimatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: buttonScale2.value}],
  }));

  return (
    <Animated.View
      className="bg-white border-t border-gray-200"
      style={bottomBarAnimatedStyle}>
      {/* Add Elements View */}
      <Animated.View
        className="absolute inset-0 p-4 justify-center"
        style={addElementsAnimatedStyle}>
        <View className="flex-row justify-center gap-8">
          {/* Add Text Button */}
          <Animated.View style={button1AnimatedStyle}>
            <Button
              onPress={addText}
              className="flex-col justify-center items-center">
              <View className="w-12 h-12 bg-primary rounded-xl items-center justify-center mb-2">
                <MaterialIcons name="text-fields" size={24} color="white" />
              </View>
              <Text className="text-primary font-medium text-sm">Add Text</Text>
            </Button>
          </Animated.View>

          {/* Add Image Button */}
          <Animated.View style={button2AnimatedStyle}>
            <Button
              onPress={addImage}
              className="flex-col justify-center items-center">
              <View className="w-12 h-12 bg-primary rounded-xl items-center justify-center mb-2">
                <MaterialIcons name="image" size={24} color="white" />
              </View>
              <Text className="text-primary font-medium text-sm">
                Add Image
              </Text>
            </Button>
          </Animated.View>
        </View>
      </Animated.View>

      {/* Element Controls View */}
      <Animated.View className="absolute inset-0" style={controlsAnimatedStyle}>
        {/* Back to tools button */}
        <View className="px-4 pt-3 pb-2 border-b border-gray-100">
          <TouchableOpacity
            onPress={onClearSelection}
            className="flex-row items-center">
            <MaterialIcons name="arrow-back" size={16} color="#55a4ff" />
            <Text className="text-primary text-sm font-medium ml-1">
              Back to Tools
            </Text>
          </TouchableOpacity>
        </View>

        {selectedElementType === 'text' ? (
          <TextControls
            element={selectedTextElement}
            textElements={canvasState.textElements}
            onUpdateCanvas={onUpdateCanvas}
            onClearSelection={onClearSelection}
          />
        ) : (
          <ImageControls
            element={selectedImageElement}
            imageElements={canvasState.imageElements}
            onUpdateCanvas={onUpdateCanvas}
            onClearSelection={onClearSelection}
          />
        )}
      </Animated.View>
    </Animated.View>
  );
};

export default BottomControls;
