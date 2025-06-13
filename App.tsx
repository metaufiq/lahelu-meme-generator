// App.tsx
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {MemeCanvas} from './src/components/Canvas/MemeCanvas';
import {TemplateGrid} from './src/components/TemplateSelector/TemplateGrid';
import {TextControls} from './src/components/Controls/TextControls';
import {
  CanvasState,
  TextElement,
  ImageElement,
  MemeTemplate,
} from './src/types';

const App: React.FC = () => {
  const [showTemplates, setShowTemplates] = useState(false); // Changed from true to false
  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null,
  );
  const [selectedElementType, setSelectedElementType] = useState<
    'text' | 'image' | null
  >(null);

  const [canvasState, setCanvasState] = useState<CanvasState>({
    template: null,
    textElements: [],
    imageElements: [],
    scale: 1,
    translateX: 0,
    translateY: 0,
  });

  const handleSelectTemplate = (template: MemeTemplate) => {
    setCanvasState(prev => ({
      ...prev,
      template,
      textElements: [],
      imageElements: [],
    }));
    setShowTemplates(false);
  };

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

  if (showTemplates) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.templateHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowTemplates(false)}>
            <Text style={styles.backButtonText}>← Back to Canvas</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Choose a Meme Template</Text>
        <TemplateGrid onSelectTemplate={handleSelectTemplate} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => setShowTemplates(true)}>
          <Text style={styles.headerButtonText}>Templates</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton} onPress={addText}>
          <Text style={styles.headerButtonText}>Add Text</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton} onPress={addImage}>
          <Text style={styles.headerButtonText}>Add Image</Text>
        </TouchableOpacity>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerButton: {
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 8,
  },
  headerButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  templateHeader: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    padding: 10,
    backgroundColor: '#6c757d',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
