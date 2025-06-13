import {FC, useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, View} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CanvasState, ImageElement, TextElement} from '../../types';

import {Button} from '../../components/Button';
import {MemeCanvas} from '../../components/Canvas/MemeCanvas';
import {TextControls} from '../../components/Controls/TextControls';
import {RootStackParamList} from '../../routes/types';
import styles from './styles';

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

  // Update canvas state when a new template is selected
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Button onPress={() => navigation.navigate('TemplateSelection')}>
          <Text style={styles.headerButtonText}>Templates</Text>
        </Button>
        <Button onPress={addText}>
          <Text style={styles.headerButtonText}>Add Text</Text>
        </Button>
        <Button onPress={addImage}>
          <Text style={styles.headerButtonText}>Add Image</Text>
        </Button>
      </View>

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

      {selectedElementType === 'text' && selectedTextElement && (
        <TextControls
          element={selectedTextElement}
          onUpdate={updatedElement => {
            const updatedTexts = canvasState.textElements.map(t =>
              t.id === updatedElement.id ? updatedElement : t,
            );
            setCanvasState(prev => ({...prev, textElements: updatedTexts}));
          }}
          onDelete={() => {
            const filteredTexts = canvasState.textElements.filter(
              t => t.id !== selectedElementId,
            );
            setCanvasState(prev => ({...prev, textElements: filteredTexts}));
            setSelectedElementId(null);
            setSelectedElementType(null);
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
      )}
    </SafeAreaView>
  );
};

export default MemeCanvasScreen;
