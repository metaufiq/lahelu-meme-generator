// src/components/Controls/ImageControls.tsx
import React from 'react';
import {View, Text} from 'react-native';
import Slider from '@react-native-community/slider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ImageElement} from '../../types';
import {Button} from '../Button';

interface Props {
  element?: ImageElement | null;
  onUpdate: (element: ImageElement) => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

export const ImageControls: React.FC<Props> = ({
  element,
  onUpdate,
  onDelete,
  onDuplicate,
}) => {
  if (!element) {
    return null;
  }

  return (
    <View className="p-4 bg-gray-50 border-t border-gray-200">
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
          onValueChange={opacity => onUpdate({...element, opacity})}
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
          onValueChange={scale => onUpdate({...element, scale})}
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
          onValueChange={rotation => onUpdate({...element, rotation})}
          minimumTrackTintColor="#55a4ff"
          maximumTrackTintColor="#e5e7eb"
          thumbTintColor="#55a4ff"
        />
      </View>

      {/* Action Buttons */}
      <View className="flex-row justify-center gap-2">
        <Button
          onPress={onDuplicate}
          title="Duplicate"
          leftIcon={
            <MaterialIcons name="content-copy" size={16} color="white" />
          }
        />
        <Button
          onPress={onDelete}
          variant="danger"
          leftIcon={<MaterialIcons name="delete" size={16} color="white" />}
          title="Delete"
        />
      </View>
    </View>
  );
};
