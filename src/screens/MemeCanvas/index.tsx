import {FC, useCallback, useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, View, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CanvasState, ImageElement, TextElement} from '../../types';

import {MemeCanvas} from '../../components/Canvas/MemeCanvas';
import {TextControls} from '../../components/TextControls';
import {ImageControls} from '../../components/ImageControls';
import {RootStackParamList} from '../../routes/types';
import {Button} from '../../components/Button';

type MemeCanvasScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'MemeCanvas'
>;

const MemeCanvasScreen: FC<MemeCanvasScreenProps> = ({navigation, route}) => {
  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null,
  );
  const [selectedElementType, setSelectedElementType] = useState<
    'text' | 'image' | null
  >(null);

  const [canvasState, setCanvasState] = useState<CanvasState>(() => ({
    template: route.params?.selectedTemplate || null,
    textElements: [],
    imageElements: [],
    scale: 1,
    translateX: 0,
    translateY: 0,
  }));

  useEffect(() => {
    if (route.params?.selectedTemplate) {
      setCanvasState(prev => ({
        ...prev,
        template: route.params!.selectedTemplate!,
        // Reset elements when new template is selected
        textElements: [],
        imageElements: [],
      }));
    }
  }, [route.params, route.params?.selectedTemplate]);

  const navigateToTemplateSelection = useCallback(() => {
    navigation.navigate('TemplateSelection');
  }, [navigation]);

  const addText = () => {
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
    setCanvasState(prev => ({
      ...prev,
      textElements: [...prev.textElements, newText],
    }));
  };

  const addImage = () => {
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
        setCanvasState(prev => ({
          ...prev,
          imageElements: [...prev.imageElements, newImage],
        }));
      }
    });
  };

  const selectedTextElement = canvasState.textElements.find(
    t => t.id === selectedElementId,
  );

  const selectedImageElement = canvasState.imageElements.find(
    i => i.id === selectedElementId,
  );

  const clearSelection = () => {
    setSelectedElementId(null);
    setSelectedElementType(null);
  };

  // Empty state when no template is selected
  if (!canvasState.template) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 justify-center items-center px-6">
          <View className="items-center space-y-4">
            <Text className="text-3xl font-bold text-text mb-2">
              Create Your Meme
            </Text>
            <Text className="text-lg text-muted text-center mb-8 leading-6">
              Choose a template to get started with your meme creation
            </Text>
            <TouchableOpacity
              onPress={navigateToTemplateSelection}
              className="bg-primary px-8 py-4 rounded-button shadow-button active:shadow-button-pressed">
              <Text className="text-white text-lg font-semibold">
                Choose Template
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Canvas Area */}
      <View className="flex-1">
        <MemeCanvas
          canvasState={canvasState}
          onUpdateCanvas={updates =>
            setCanvasState(prev => ({...prev, ...updates}))
          }
          onSelectElement={(id, type) => {
            setSelectedElementId(id);
            setSelectedElementType(type);
          }}
        />
      </View>

      {/* Bottom Controls */}
      <View className="bg-white border-t border-gray-200">
        {selectedElementId ? (
          // Text Controls
          <View>
            {/* Back to tools button */}
            <View className="px-4 pt-3 pb-2 border-b border-gray-100">
              <TouchableOpacity
                onPress={clearSelection}
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
                onUpdate={updatedElement => {
                  const updatedTexts = canvasState.textElements.map(t =>
                    t.id === updatedElement.id ? updatedElement : t,
                  );
                  setCanvasState(prev => ({
                    ...prev,
                    textElements: updatedTexts,
                  }));
                }}
                onDelete={() => {
                  const filteredTexts = canvasState.textElements.filter(
                    t => t.id !== selectedElementId,
                  );
                  setCanvasState(prev => ({
                    ...prev,
                    textElements: filteredTexts,
                  }));
                  clearSelection();
                }}
                onDuplicate={() => {
                  if (selectedTextElement) {
                    const duplicated = {
                      ...selectedTextElement,
                      id: Date.now().toString(),
                      x: selectedTextElement.x + 20,
                      y: selectedTextElement.y + 20,
                    };
                    setCanvasState(prev => ({
                      ...prev,
                      textElements: [...prev.textElements, duplicated],
                    }));
                  }
                }}
              />
            ) : (
              <ImageControls
                element={selectedImageElement}
                onUpdate={updatedElement => {
                  const updatedImages = canvasState.imageElements.map(i =>
                    i.id === updatedElement.id ? updatedElement : i,
                  );
                  setCanvasState(prev => ({
                    ...prev,
                    imageElements: updatedImages,
                  }));
                }}
                onDelete={() => {
                  const filteredImages = canvasState.imageElements.filter(
                    i => i.id !== selectedElementId,
                  );
                  setCanvasState(prev => ({
                    ...prev,
                    imageElements: filteredImages,
                  }));
                  clearSelection();
                }}
                onDuplicate={() => {
                  if (selectedImageElement) {
                    const duplicated = {
                      ...selectedImageElement,
                      id: Date.now().toString(),
                      x: selectedImageElement.x + 20,
                      y: selectedImageElement.y + 20,
                    };
                    setCanvasState(prev => ({
                      ...prev,
                      imageElements: [...prev.imageElements, duplicated],
                    }));
                  }
                }}
              />
            )}
          </View>
        ) : (
          // Add Tools Navigation
          <View className="p-4">
            <Text className="text-center text-gray-600 text-sm font-medium mb-3">
              Add Elements
            </Text>
            <View className="flex-row justify-center gap-8">
              {/* Add Text Button */}
              <Button
                onPress={addText}
                className="flex-col justify-center items-center">
                <View className="w-12 h-12 bg-primary rounded-xl items-center justify-center mb-2">
                  <MaterialIcons name="text-fields" size={24} color="white" />
                </View>
                <Text className="text-primary font-medium text-sm">Text</Text>
              </Button>

              {/* Add Image Button */}
              <Button
                onPress={addImage}
                className="flex-col justify-center items-center">
                <View className="w-12 h-12 bg-primary rounded-xl items-center justify-center mb-2">
                  <MaterialIcons name="image" size={24} color="white" />
                </View>
                <Text className="text-primary font-medium text-sm">Image</Text>
              </Button>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MemeCanvasScreen;
