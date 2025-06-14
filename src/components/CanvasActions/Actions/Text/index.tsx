// TextActions/index.tsx
import React, {useCallback, useMemo} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {TextElement, CanvasState} from '../../../../types';
import {Button} from '../../../Button';
import Tabs, {TabItem} from '../../../Tabs';
import useStyles from './styles';

interface Props {
  element?: TextElement | null;
  textElements: TextElement[];
  onUpdateCanvas: (updates: Partial<CanvasState>) => void;
  onClearSelection: () => void;
}

export const COLOR_PALETTE = [
  '#000000',
  '#FFFFFF',
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
];

const TextActions: React.FC<Props> = ({
  element,
  textElements,
  onUpdateCanvas,
  onClearSelection,
}) => {
  const {
    containerStyle,
    textInputStyle,
    labelStyle,
    sliderContainerStyle,
    sliderStyle,
    colorPickerContainerStyle,
    colorPickerLabelStyle,
    buttonContainerStyle,
    tabContentStyle,
    getColorButtonStyle,
    sliderColors,
    placeholderTextColor,
  } = useStyles();

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

  const tabs: TabItem[] = useMemo(() => {
    if (!element) {
      return [];
    }

    return [
      {
        id: 'text',
        label: 'Text',
        icon: (
          <MaterialIcons name="text-fields" size={16} color="currentColor" />
        ),
        content: (
          <View style={tabContentStyle}>
            <TextInput
              style={textInputStyle}
              value={element.text}
              onChangeText={text => handleUpdate({...element, text})}
              placeholder="Enter text..."
              placeholderTextColor={placeholderTextColor}
            />

            <View style={sliderContainerStyle}>
              <Text style={labelStyle}>
                Font Size: {Math.round(element.fontSize)}
              </Text>
              <Slider
                style={sliderStyle}
                minimumValue={12}
                maximumValue={72}
                value={element.fontSize}
                onValueChange={fontSize => handleUpdate({...element, fontSize})}
                minimumTrackTintColor={sliderColors.minimum}
                maximumTrackTintColor={sliderColors.maximum}
                thumbTintColor={sliderColors.thumb}
              />
            </View>
          </View>
        ),
      },
      {
        id: 'style',
        label: 'Style',
        icon: <MaterialIcons name="palette" size={16} color="currentColor" />,
        content: (
          <View style={tabContentStyle}>
            <View style={colorPickerContainerStyle}>
              <Text style={colorPickerLabelStyle}>Color:</Text>
              {COLOR_PALETTE.map(color => (
                <TouchableOpacity
                  key={color}
                  style={getColorButtonStyle(color, element.color === color)}
                  onPress={() => handleUpdate({...element, color})}
                />
              ))}
            </View>
          </View>
        ),
      },
      {
        id: 'actions',
        label: 'Actions',
        icon: <MaterialIcons name="settings" size={16} color="currentColor" />,
        content: (
          <View style={tabContentStyle}>
            <View style={buttonContainerStyle}>
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
                leftIcon={
                  <MaterialIcons name="delete" size={16} color="white" />
                }
                title="Delete"
              />
            </View>
          </View>
        ),
      },
    ];
  }, [
    element,
    tabContentStyle,
    textInputStyle,
    placeholderTextColor,
    handleUpdate,
    sliderContainerStyle,
    labelStyle,
    sliderStyle,
    sliderColors,
    colorPickerContainerStyle,
    colorPickerLabelStyle,
    getColorButtonStyle,
    buttonContainerStyle,
    handleDuplicate,
    handleDelete,
  ]);

  if (!element) {
    return null;
  }

  return (
    <View style={containerStyle}>
      <Tabs tabs={tabs} defaultActiveTab="text" />
    </View>
  );
};

export default TextActions;
