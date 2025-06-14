import React, {useCallback} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TextElement, CanvasState} from '../../types';
import {Button} from '../Button';

interface Props {
  element?: TextElement | null;
  textElements: TextElement[];
  onUpdateCanvas: (updates: Partial<CanvasState>) => void;
  onClearSelection: () => void;
}

const TextControls: React.FC<Props> = ({
  element,
  textElements,
  onUpdateCanvas,
  onClearSelection,
}) => {
  const handleUpdate = useCallback(
    (updatedElement: TextElement) => {
      const updatedTexts = textElements.map(t =>
        t.id === updatedElement.id ? updatedElement : t,
      );
      onUpdateCanvas({textElements: updatedTexts});
    },
    [onUpdateCanvas, textElements],
  );

  const handleDelete = useCallback(() => {
    if (!element) {
      return;
    }
    const filteredTexts = textElements.filter(t => t.id !== element.id);
    onUpdateCanvas({textElements: filteredTexts});
    onClearSelection();
  }, [element, onClearSelection, onUpdateCanvas, textElements]);

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
      textElements: [...textElements, duplicated],
    });
  }, [element, onUpdateCanvas, textElements]);

  if (!element) {
    return null;
  }

  return (
    <View className="p-4">
      <TextInput
        className="border border-gray-300 p-3 mb-4 bg-white rounded-lg text-base"
        value={element.text}
        onChangeText={text => handleUpdate({...element, text})}
        placeholder="Enter text..."
        placeholderTextColor="#9ca3af"
      />

      <View className="mb-4">
        <Text className="text-gray-700 text-sm font-medium mb-2">
          Font Size: {Math.round(element.fontSize)}
        </Text>
        <Slider
          className="w-full h-10"
          minimumValue={12}
          maximumValue={72}
          value={element.fontSize}
          onValueChange={fontSize => handleUpdate({...element, fontSize})}
          minimumTrackTintColor="#55a4ff"
          maximumTrackTintColor="#e5e7eb"
          thumbTintColor="#55a4ff"
        />
      </View>

      <View className="flex-row items-center mb-4">
        <Text className="text-gray-700 text-sm font-medium mr-3">Color:</Text>
        {['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00'].map(
          color => (
            <TouchableOpacity
              key={color}
              className="w-8 h-8 rounded-full ml-2 border-2 border-gray-300"
              style={{backgroundColor: color}}
              onPress={() => handleUpdate({...element, color})}
            />
          ),
        )}
      </View>

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

export default TextControls;
