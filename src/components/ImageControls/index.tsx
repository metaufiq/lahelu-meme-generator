// src/components/Controls/ImageControls.tsx
import React, {useCallback} from 'react';
import {View, Text} from 'react-native';
import Slider from '@react-native-community/slider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ImageElement, CanvasState} from '../../types';
import {Button} from '../Button';

interface Props {
  element?: ImageElement | null;
  imageElements: ImageElement[];
  onUpdateCanvas: (updates: Partial<CanvasState>) => void;
  onClearSelection: () => void;
}

const ImageControls: React.FC<Props> = ({
  element,
  imageElements,
  onUpdateCanvas,
  onClearSelection,
}) => {
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
    <View className="p-4">
      {/* Opacity Control */}
      <View className="mb-4">
        <Text className="text-gray-700 text-sm font-medium mb-2">
          Opacity: {Math.round(element.opacity * 100)}%
        </Text>
        <Slider
          className="w-full h-10"
          minimumValue={0}
          maximumValue={1}
          value={element.opacity}
          onValueChange={opacity => handleUpdate({...element, opacity})}
          minimumTrackTintColor="#55a4ff"
          maximumTrackTintColor="#e5e7eb"
          thumbTintColor="#55a4ff"
        />
      </View>

      {/* Scale Control */}
      <View className="mb-4">
        <Text className="text-gray-700 text-sm font-medium mb-2">
          Scale: {Math.round(element.scale * 100)}%
        </Text>
        <Slider
          className="w-full h-10"
          minimumValue={0.1}
          maximumValue={3}
          value={element.scale}
          onValueChange={scale => handleUpdate({...element, scale})}
          minimumTrackTintColor="#55a4ff"
          maximumTrackTintColor="#e5e7eb"
          thumbTintColor="#55a4ff"
        />
      </View>

      {/* Rotation Control */}
      <View className="mb-4">
        <Text className="text-gray-700 text-sm font-medium mb-2">
          Rotation: {Math.round(element.rotation)}°
        </Text>
        <Slider
          className="w-full h-10"
          minimumValue={-180}
          maximumValue={180}
          value={element.rotation}
          onValueChange={rotation => handleUpdate({...element, rotation})}
          minimumTrackTintColor="#55a4ff"
          maximumTrackTintColor="#e5e7eb"
          thumbTintColor="#55a4ff"
        />
      </View>

      {/* Action Buttons */}
      <View className="flex-row justify-center gap-2">
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

export default ImageControls;
