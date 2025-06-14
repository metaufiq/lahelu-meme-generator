import React, {useCallback} from 'react';
import {View, Text} from 'react-native';
import Slider from '@react-native-community/slider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ImageElement, CanvasState} from '../../../../types';
import {Button} from '../../../Button';
import useStyles from './styles';

interface Props {
  element?: ImageElement | null;
  imageElements: ImageElement[];
  onUpdateCanvas: (updates: Partial<CanvasState>) => void;
  onClearSelection: () => void;
}

const ImageActions: React.FC<Props> = ({
  element,
  imageElements,
  onUpdateCanvas,
  onClearSelection,
}) => {
  const {styles, sliderColors} = useStyles();

  const handleUpdate = useCallback(
    (updatedElement: ImageElement) => {
      const updatedImages = imageElements.map(i =>
        i.id === updatedElement.id ? updatedElement : i,
      );
      onUpdateCanvas({imageElements: updatedImages});
    },
    [imageElements, onUpdateCanvas],
  );

  const handleDelete = useCallback(() => {
    const filteredImages = imageElements.filter(i => i.id !== element?.id);
    onUpdateCanvas({imageElements: filteredImages});
    onClearSelection();
  }, [element?.id, imageElements, onClearSelection, onUpdateCanvas]);

  const handleDuplicate = useCallback(() => {
    if (!element) {
      return;
    }
    const duplicated = {
      ...element,
      id: Date.now().toString(),
      x: element.x + 20,
      y: element.y + 20,
    };
    onUpdateCanvas({
      imageElements: [...imageElements, duplicated],
    });
  }, [element, imageElements, onUpdateCanvas]);

  if (!element) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Opacity Control */}
      <View style={styles.controlGroup}>
        <Text style={styles.label}>
          Opacity: {Math.round(element.opacity * 100)}%
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={element.opacity}
          onValueChange={opacity => handleUpdate({...element, opacity})}
          minimumTrackTintColor={sliderColors.minimumTrackTintColor}
          maximumTrackTintColor={sliderColors.maximumTrackTintColor}
          thumbTintColor={sliderColors.thumbTintColor}
        />
      </View>

      {/* Scale Control */}
      <View style={styles.controlGroup}>
        <Text style={styles.label}>
          Scale: {Math.round(element.scale * 100)}%
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={0.1}
          maximumValue={3}
          value={element.scale}
          onValueChange={scale => handleUpdate({...element, scale})}
          minimumTrackTintColor={sliderColors.minimumTrackTintColor}
          maximumTrackTintColor={sliderColors.maximumTrackTintColor}
          thumbTintColor={sliderColors.thumbTintColor}
        />
      </View>

      {/* Rotation Control */}
      <View style={styles.controlGroup}>
        <Text style={styles.label}>
          Rotation: {Math.round(element.rotation)}°
        </Text>
        <Slider
          style={styles.slider}
          minimumValue={-180}
          maximumValue={180}
          value={element.rotation}
          onValueChange={rotation => handleUpdate({...element, rotation})}
          minimumTrackTintColor={sliderColors.minimumTrackTintColor}
          maximumTrackTintColor={sliderColors.maximumTrackTintColor}
          thumbTintColor={sliderColors.thumbTintColor}
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          onPress={handleDuplicate}
          title="Duplicate"
          leftIcon={
            <MaterialIcons name="content-copy" size={16} color="white" />
          }
        />
        <Button
          onPress={handleDelete}
          variant="danger"
          leftIcon={<MaterialIcons name="delete" size={16} color="white" />}
          title="Delete"
        />
      </View>
    </View>
  );
};

export default ImageActions;
