import React, {useCallback, useMemo} from 'react';
import {View, Text} from 'react-native';
import Slider from '@react-native-community/slider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {ImageElement, CanvasState} from '../../../../types';
import Tabs, {TabItem} from '../../../Tabs';
import useStyles from './styles';

interface Props {
  element?: ImageElement | null;
  imageElements: ImageElement[];
  onUpdateCanvas: (updates: Partial<CanvasState>) => void;
}

const ImageActions: React.FC<Props> = ({
  element,
  imageElements,
  onUpdateCanvas,
}) => {
  const {
    containerStyle,
    labelStyle,
    sliderContainerStyle,
    sliderStyle,
    tabContentStyle,
    sliderColors,
  } = useStyles();

  const handleUpdate = useCallback(
    (updatedElement: ImageElement) => {
      const updatedImages = imageElements.map(i =>
        i.id === updatedElement.id ? updatedElement : i,
      );
      onUpdateCanvas({imageElements: updatedImages});
    },
    [imageElements, onUpdateCanvas],
  );

  const tabs: TabItem[] = useMemo(() => {
    if (!element) {
      return [];
    }

    return [
      {
        id: 'size',
        label: 'Size',
        icon: (
          <MaterialIcons
            name="photo-size-select-large"
            size={16}
            color="currentColor"
          />
        ),
        content: (
          <View style={tabContentStyle}>
            <View style={sliderContainerStyle}>
              <Text style={labelStyle}>
                Scale: {Math.round(element.scale * 100)}%
              </Text>
              <Slider
                style={sliderStyle}
                minimumValue={0.1}
                maximumValue={3}
                value={element.scale}
                onValueChange={scale => handleUpdate({...element, scale})}
                minimumTrackTintColor={sliderColors.minimum}
                maximumTrackTintColor={sliderColors.maximum}
                thumbTintColor={sliderColors.thumb}
              />
            </View>
          </View>
        ),
      },
      {
        id: 'transform',
        label: 'Transform',
        icon: (
          <MaterialIcons name="rotate-right" size={16} color="currentColor" />
        ),
        content: (
          <View style={tabContentStyle}>
            <View style={sliderContainerStyle}>
              <Text style={labelStyle}>
                Rotation: {Math.round(element.rotation)}°
              </Text>
              <Slider
                style={sliderStyle}
                minimumValue={-180}
                maximumValue={180}
                value={element.rotation}
                onValueChange={rotation => handleUpdate({...element, rotation})}
                minimumTrackTintColor={sliderColors.minimum}
                maximumTrackTintColor={sliderColors.maximum}
                thumbTintColor={sliderColors.thumb}
              />
            </View>
          </View>
        ),
      },
      {
        id: 'effects',
        label: 'Effects',
        icon: <MaterialIcons name="tune" size={16} color="currentColor" />,
        content: (
          <View style={tabContentStyle}>
            <View style={sliderContainerStyle}>
              <Text style={labelStyle}>
                Opacity: {Math.round(element.opacity * 100)}%
              </Text>
              <Slider
                style={sliderStyle}
                minimumValue={0}
                maximumValue={1}
                value={element.opacity}
                onValueChange={opacity => handleUpdate({...element, opacity})}
                minimumTrackTintColor={sliderColors.minimum}
                maximumTrackTintColor={sliderColors.maximum}
                thumbTintColor={sliderColors.thumb}
              />
            </View>
          </View>
        ),
      },
    ];
  }, [
    element,
    tabContentStyle,
    sliderContainerStyle,
    labelStyle,
    sliderStyle,
    sliderColors,
    handleUpdate,
  ]);

  if (!element) {
    return null;
  }

  return (
    <View style={containerStyle}>
      <Tabs tabs={tabs} defaultActiveTab="size" />
    </View>
  );
};

export default ImageActions;
