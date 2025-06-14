// TextActions/index.tsx
import React, {useCallback, useMemo} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {TextElement, CanvasState} from '../../../../types';
import Tabs, {TabItem} from '../../../Tabs';
import {COLOR_PALETTE, FONT_FAMILIES} from './constants';
import useStyles from './styles';

interface Props {
  element?: TextElement | null;
  textElements: TextElement[];
  onUpdateCanvas: (updates: Partial<CanvasState>) => void;
}

const TextActions: React.FC<Props> = ({
  element,
  textElements,
  onUpdateCanvas,
}) => {
  const {
    containerStyle,
    textInputStyle,
    labelStyle,
    sliderContainerStyle,
    sliderStyle,
    colorPickerContainerStyle,
    colorPickerLabelStyle,
    tabContentStyle,
    getColorButtonStyle,
    fontFamilyContainerStyle,
    fontFamilyButtonStyle,
    getFontFamilyButtonStyle,
    fontFamilyButtonTextStyle,
    colorRowStyle,
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
          </View>
        ),
      },
      {
        id: 'size',
        label: 'Size',
        icon: (
          <MaterialIcons name="format-size" size={16} color="currentColor" />
        ),
        content: (
          <View style={tabContentStyle}>
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
        id: 'width',
        label: 'Width',
        icon: (
          <MaterialIcons name="swap-horiz" size={16} color="currentColor" />
        ),
        content: (
          <View style={tabContentStyle}>
            <View style={sliderContainerStyle}>
              <Text style={labelStyle}>
                Text Width: {Math.round(element.width || 100)}%
              </Text>
              <Slider
                style={sliderStyle}
                minimumValue={1}
                maximumValue={100}
                value={element.width || 100}
                onValueChange={width => handleUpdate({...element, width})}
                minimumTrackTintColor={sliderColors.minimum}
                maximumTrackTintColor={sliderColors.maximum}
                thumbTintColor={sliderColors.thumb}
              />
            </View>
          </View>
        ),
      },
      {
        id: 'font',
        label: 'Font',
        icon: (
          <MaterialIcons name="font-download" size={16} color="currentColor" />
        ),
        content: (
          <ScrollView
            style={tabContentStyle}
            showsVerticalScrollIndicator={false}>
            <View style={fontFamilyContainerStyle}>
              <Text style={colorPickerLabelStyle}>Font Family:</Text>
              <View style={fontFamilyButtonStyle}>
                {FONT_FAMILIES.map(font => (
                  <TouchableOpacity
                    key={font.value}
                    style={getFontFamilyButtonStyle(
                      element.fontFamily === font.value,
                    )}
                    onPress={() =>
                      handleUpdate({...element, fontFamily: font.value})
                    }>
                    <Text style={fontFamilyButtonTextStyle}>{font.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        ),
      },
      {
        id: 'color',
        label: 'Color',
        icon: (
          <MaterialIcons name="color-lens" size={16} color="currentColor" />
        ),
        content: (
          <ScrollView
            style={tabContentStyle}
            showsVerticalScrollIndicator={false}>
            <View style={colorPickerContainerStyle}>
              <Text style={colorPickerLabelStyle}>Text Color:</Text>
              <View style={colorRowStyle}>
                {COLOR_PALETTE.map(color => (
                  <TouchableOpacity
                    key={`text-${color}`}
                    style={getColorButtonStyle(color, element.color === color)}
                    onPress={() => handleUpdate({...element, color})}
                  />
                ))}
              </View>
            </View>
          </ScrollView>
        ),
      },
      {
        id: 'background',
        label: 'Background',
        icon: (
          <MaterialIcons
            name="format-color-fill"
            size={16}
            color="currentColor"
          />
        ),
        content: (
          <ScrollView
            style={tabContentStyle}
            showsVerticalScrollIndicator={false}>
            <View style={colorPickerContainerStyle}>
              <Text style={colorPickerLabelStyle}>Background Color:</Text>
              <View style={colorRowStyle}>
                <TouchableOpacity
                  style={getColorButtonStyle(
                    'transparent',
                    element.backgroundColor === 'transparent',
                  )}
                  onPress={() =>
                    handleUpdate({...element, backgroundColor: 'transparent'})
                  }>
                  <MaterialIcons name="block" size={16} color="#666" />
                </TouchableOpacity>
                {COLOR_PALETTE.map(color => (
                  <TouchableOpacity
                    key={`bg-${color}`}
                    style={getColorButtonStyle(
                      color,
                      element.backgroundColor === color,
                    )}
                    onPress={() =>
                      handleUpdate({...element, backgroundColor: color})
                    }
                  />
                ))}
              </View>
            </View>
          </ScrollView>
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
    fontFamilyContainerStyle,
    fontFamilyButtonStyle,
    getFontFamilyButtonStyle,
    fontFamilyButtonTextStyle,
    colorRowStyle,
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
