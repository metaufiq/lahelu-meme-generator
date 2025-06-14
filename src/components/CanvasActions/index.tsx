import React, {FC, useCallback, useEffect} from 'react';
import {Text, View, Dimensions} from 'react-native';
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
import {Button} from '../Button';
import ImageActions from './Actions/Image';
import TextActions, {COLOR_PALETTE} from './Actions/Text';
import useThemeStore from '../../stores/theme';
import useStyles, {ICON_SIZE} from './styles';

interface Props {
  selectedElementId: string | null;
  selectedElementType: 'text' | 'image' | null;
  canvasState: CanvasState;
  onUpdateCanvas: (updates: Partial<CanvasState>) => void;
  onClearSelection: () => void;
  onShare: () => Promise<void>;
  canvasWidth?: number;
  canvasHeight?: number;
  currentScale?: number;
  currentTranslateX?: number;
  currentTranslateY?: number;
}

const NORMAL_HEIGHT = 70;

const CanvasActions: FC<Props> = ({
  selectedElementId,
  selectedElementType,
  canvasState,
  onUpdateCanvas,
  onClearSelection,
  onShare,
  canvasWidth,
  canvasHeight,
  currentScale = 1,
  currentTranslateX = 0,
  currentTranslateY = 0,
}) => {
  const styles = useStyles();
  const getColor = useThemeStore(state => state.getColor);

  // Get screen dimensions as fallback
  const screenDimensions = Dimensions.get('window');

  // Calculate center position based on current viewport
  const getCenterPosition = useCallback(() => {
    // Use provided canvas dimensions or fallback to screen dimensions
    const width = canvasWidth || screenDimensions.width;
    const height = canvasHeight || screenDimensions.height * 0.7;

    // Get the center of the current viewport (screen center)
    const viewportCenterX = width / 2;
    const viewportCenterY = height / 2;

    // Convert viewport center to canvas coordinates by accounting for current transform
    // Reverse the transform: (screenPoint - translation) / scale = canvasPoint
    const canvasCenterX = (viewportCenterX - currentTranslateX) / currentScale;
    const canvasCenterY = (viewportCenterY - currentTranslateY) / currentScale;

    return {
      x: canvasCenterX,
      y: canvasCenterY,
    };
  }, [
    canvasWidth,
    canvasHeight,
    screenDimensions,
    currentScale,
    currentTranslateX,
    currentTranslateY,
  ]);

  // Animation values
  const bottomBarHeight = useSharedValue(NORMAL_HEIGHT);
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
      bottomBarHeight.value = withSpring(190, {damping: 15, stiffness: 100});
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
      // Switch to normal view
      bottomBarHeight.value = withSpring(NORMAL_HEIGHT, {
        damping: 15,
        stiffness: 100,
      });
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

  const addText = useCallback(() => {
    buttonScale1.value = withSpring(0.9, {damping: 10}, () => {
      buttonScale1.value = withSpring(1, {damping: 8});
    });

    const centerPosition = getCenterPosition();
    const newText: TextElement = {
      id: Date.now().toString(),
      text: 'Your text here',
      x: centerPosition.x,
      y: centerPosition.y,
      fontSize: 24,
      color: COLOR_PALETTE[0],
      fontFamily: 'Arial',
      rotation: 0,
      scale: 1,
    };

    onUpdateCanvas({
      textElements: [...canvasState.textElements, newText],
    });
  }, [
    buttonScale1,
    canvasState.textElements,
    onUpdateCanvas,
    getCenterPosition,
  ]);

  const addImage = useCallback(() => {
    buttonScale2.value = withSpring(0.9, {damping: 10}, () => {
      buttonScale2.value = withSpring(1, {damping: 8});
    });

    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.assets && response.assets[0]) {
        const asset = response.assets[0];
        const centerPosition = getCenterPosition();

        const newImage: ImageElement = {
          id: Date.now().toString(),
          uri: asset.uri!,
          x: centerPosition.x,
          y: centerPosition.y,
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
  }, [
    buttonScale2,
    canvasState.imageElements,
    onUpdateCanvas,
    getCenterPosition,
  ]);

  const handleDuplicate = useCallback(() => {
    if (!selectedElementId || !selectedElementType) {
      return;
    }

    if (selectedElementType === 'text') {
      const element = canvasState.textElements.find(
        t => t.id === selectedElementId,
      );
      if (element) {
        const duplicated = {
          ...element,
          id: Date.now().toString(),
          x: element.x + 20,
          y: element.y + 20,
        };
        onUpdateCanvas({
          textElements: [...canvasState.textElements, duplicated],
        });
      }
    } else if (selectedElementType === 'image') {
      const element = canvasState.imageElements.find(
        i => i.id === selectedElementId,
      );
      if (element) {
        const duplicated = {
          ...element,
          id: Date.now().toString(),
          x: element.x + 20,
          y: element.y + 20,
        };
        onUpdateCanvas({
          imageElements: [...canvasState.imageElements, duplicated],
        });
      }
    }
  }, [selectedElementId, selectedElementType, canvasState, onUpdateCanvas]);

  const handleDelete = useCallback(() => {
    if (!selectedElementId || !selectedElementType) {
      return;
    }

    if (selectedElementType === 'text') {
      const filteredTexts = canvasState.textElements.filter(
        t => t.id !== selectedElementId,
      );
      onUpdateCanvas({textElements: filteredTexts});
    } else if (selectedElementType === 'image') {
      const filteredImages = canvasState.imageElements.filter(
        i => i.id !== selectedElementId,
      );
      onUpdateCanvas({imageElements: filteredImages});
    }

    onClearSelection();
  }, [
    selectedElementId,
    selectedElementType,
    canvasState,
    onUpdateCanvas,
    onClearSelection,
  ]);

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
    <Animated.View style={[styles.bottomBarContainer, bottomBarAnimatedStyle]}>
      {/* Normal View */}
      <Animated.View
        style={[styles.addElementsContainer, addElementsAnimatedStyle]}
        pointerEvents={selectedElementId ? 'none' : 'auto'}>
        <View style={styles.addElementsRow}>
          {/* Add Text Button */}
          <Animated.View style={button1AnimatedStyle}>
            <Button
              variant="ghost"
              onPress={addText}
              style={styles.actionButtonContainer}>
              <View style={styles.actionIconContainer}>
                <MaterialIcons
                  name="text-fields"
                  size={ICON_SIZE}
                  color={getColor('white')}
                />
              </View>
              <Text style={styles.actionLabel}>Add Text</Text>
            </Button>
          </Animated.View>

          {/* Add Image Button */}
          <Animated.View style={button2AnimatedStyle}>
            <Button
              variant="ghost"
              onPress={addImage}
              style={styles.actionButtonContainer}>
              <View style={styles.actionIconContainer}>
                <MaterialIcons
                  name="image"
                  size={ICON_SIZE}
                  color={getColor('white')}
                />
              </View>
              <Text style={styles.actionLabel}>Add Image</Text>
            </Button>
          </Animated.View>

          {/* Export Button */}
          <Animated.View style={button2AnimatedStyle}>
            <Button
              variant="ghost"
              onPress={onShare}
              style={styles.actionButtonContainer}>
              <View style={styles.actionIconContainer}>
                <MaterialIcons
                  name="share"
                  size={ICON_SIZE}
                  color={getColor('white')}
                />
              </View>
              <Text style={styles.actionLabel}>Share Now</Text>
            </Button>
          </Animated.View>
        </View>
      </Animated.View>

      {/* Element Controls View */}
      <Animated.View
        style={[styles.controlsContainer, controlsAnimatedStyle]}
        pointerEvents={selectedElementId ? 'auto' : 'none'}>
        <View style={styles.controlsHeader}>
          <Button
            onPress={handleDelete}
            variant="ghost"
            size="sm"
            leftIcon={
              <MaterialIcons
                name="delete"
                size={20}
                color={getColor('danger')}
              />
            }
          />
          <Button
            onPress={handleDuplicate}
            variant="ghost"
            size="sm"
            leftIcon={
              <MaterialIcons
                name="content-copy"
                size={20}
                color={getColor('muted')}
              />
            }
          />
          {/* Close Button */}
          <Button
            onPress={onClearSelection}
            variant="ghost"
            size="sm"
            leftIcon={
              <MaterialIcons name="close" size={24} color={getColor('muted')} />
            }
          />
        </View>
        {selectedElementType === 'text' ? (
          <TextActions
            element={selectedTextElement}
            textElements={canvasState.textElements}
            onUpdateCanvas={onUpdateCanvas}
          />
        ) : (
          <ImageActions
            element={selectedImageElement}
            imageElements={canvasState.imageElements}
            onUpdateCanvas={onUpdateCanvas}
          />
        )}
      </Animated.View>
    </Animated.View>
  );
};

export default CanvasActions;
