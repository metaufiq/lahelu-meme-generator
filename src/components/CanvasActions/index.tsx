import React, {FC, useCallback, useEffect} from 'react';
import {Text, View, Dimensions} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

import {CanvasState, ElementType, ImageElement, TextElement} from '../../types';
import {Button} from '../Button';
import ImageActions from './Actions/Image';
import TextActions from './Actions/Text';
import {COLOR_PALETTE} from './Actions/Text/constants';
import useThemeStore from '../../stores/theme';
import useStyles, {ICON_SIZE} from './styles';

interface Props {
  selectedElementId: string | null;
  selectedElementType: ElementType | null;
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
const EXPANDED_HEIGHT = 200;

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
  const screenDimensions = Dimensions.get('window');

  const bottomBarHeight = useSharedValue(NORMAL_HEIGHT);
  const contentOpacity = useSharedValue(1);
  const controlsOpacity = useSharedValue(0);

  const isElementSelected = !!selectedElementId;

  // Get center position for new elements
  const getCenterPosition = useCallback(() => {
    const width = canvasWidth || screenDimensions.width;
    const height = canvasHeight || screenDimensions.height * 0.7;

    const viewportCenterX = width / 2;
    const viewportCenterY = height / 2;

    return {
      x: (viewportCenterX - currentTranslateX) / currentScale,
      y: (viewportCenterY - currentTranslateY) / currentScale,
    };
  }, [
    canvasWidth,
    canvasHeight,
    screenDimensions,
    currentScale,
    currentTranslateX,
    currentTranslateY,
  ]);

  // Animate bottom bar when selection changes
  useEffect(() => {
    if (isElementSelected) {
      bottomBarHeight.value = withSpring(EXPANDED_HEIGHT);
      contentOpacity.value = withTiming(0, {duration: 200});
      controlsOpacity.value = withTiming(1, {duration: 300});
    } else {
      bottomBarHeight.value = withSpring(NORMAL_HEIGHT);
      controlsOpacity.value = withTiming(0, {duration: 200});
      contentOpacity.value = withTiming(1, {duration: 300});
    }
  }, [isElementSelected]);

  const addElement = useCallback(
    (type: ElementType) => {
      if (type === 'text') {
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
      } else {
        launchImageLibrary({mediaType: 'photo'}, response => {
          if (response.assets?.[0]) {
            const centerPosition = getCenterPosition();
            const newImage: ImageElement = {
              id: Date.now().toString(),
              uri: response.assets[0].uri!,
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
      }
    },
    [getCenterPosition, canvasState, onUpdateCanvas],
  );

  const handleElementAction = useCallback(
    (action: 'duplicate' | 'delete') => {
      if (!selectedElementId || !selectedElementType) return;

      const elements =
        selectedElementType === 'text'
          ? canvasState.textElements
          : canvasState.imageElements;

      const element = elements.find(el => el.id === selectedElementId);
      if (!element) return;

      if (action === 'duplicate') {
        const duplicated = {
          ...element,
          id: Date.now().toString(),
          x: element.x + 20,
          y: element.y + 20,
        };

        const updateKey =
          selectedElementType === 'text' ? 'textElements' : 'imageElements';
        onUpdateCanvas({
          [updateKey]: [...elements, duplicated],
        });
      } else {
        const filtered = elements.filter(el => el.id !== selectedElementId);
        const updateKey =
          selectedElementType === 'text' ? 'textElements' : 'imageElements';
        onUpdateCanvas({[updateKey]: filtered});
        onClearSelection();
      }
    },
    [
      selectedElementId,
      selectedElementType,
      canvasState,
      onUpdateCanvas,
      onClearSelection,
    ],
  );

  const selectedElement =
    selectedElementType === 'text'
      ? canvasState.textElements.find(t => t.id === selectedElementId)
      : canvasState.imageElements.find(i => i.id === selectedElementId);

  const actionButtons = [
    {
      icon: 'text-fields',
      label: 'Add Text',
      onPress: () => addElement('text'),
    },
    {
      icon: 'image',
      label: 'Add Image',
      onPress: () => addElement('image'),
    },
    {
      icon: 'share',
      label: 'Share Now',
      onPress: onShare,
    },
  ];

  // Animated styles
  const bottomBarStyle = useAnimatedStyle(() => ({
    height: bottomBarHeight.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  const controlsStyle = useAnimatedStyle(() => ({
    opacity: controlsOpacity.value,
  }));

  const renderActionButton = (
    button: (typeof actionButtons)[0],
    index: number,
  ) => (
    <Button
      key={index}
      variant="ghost"
      onPress={button.onPress}
      style={styles.actionButtonContainer}>
      <View style={styles.actionIconContainer}>
        <MaterialIcons
          name={button.icon}
          size={ICON_SIZE}
          color={getColor('white')}
        />
      </View>
      <Text style={styles.actionLabel}>{button.label}</Text>
    </Button>
  );

  return (
    <Animated.View style={[styles.bottomBarContainer, bottomBarStyle]}>
      {/* Add Elements View */}
      <Animated.View
        style={[styles.addElementsContainer, contentStyle]}
        pointerEvents={isElementSelected ? 'none' : 'auto'}>
        <View style={styles.addElementsRow}>
          {actionButtons.map(renderActionButton)}
        </View>
      </Animated.View>

      {/* Element Controls View */}
      <Animated.View
        style={[styles.controlsContainer, controlsStyle]}
        pointerEvents={isElementSelected ? 'auto' : 'none'}>
        <View style={styles.controlsHeader}>
          <Button
            onPress={() => handleElementAction('delete')}
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
            onPress={() => handleElementAction('duplicate')}
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
            element={selectedElement as TextElement}
            textElements={canvasState.textElements}
            onUpdateCanvas={onUpdateCanvas}
          />
        ) : (
          <ImageActions
            element={selectedElement as ImageElement}
            imageElements={canvasState.imageElements}
            onUpdateCanvas={onUpdateCanvas}
          />
        )}
      </Animated.View>
    </Animated.View>
  );
};

export default CanvasActions;
