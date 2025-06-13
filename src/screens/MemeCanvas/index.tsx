import {FC, useCallback, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, View, TouchableOpacity} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CanvasState} from '../../types';

import {MemeCanvas} from '../../components/Canvas/MemeCanvas';
import BottomControls from '../../components/BottomControls';
import {RootStackParamList} from '../../routes/types';

type Props = NativeStackScreenProps<RootStackParamList, 'MemeCanvas'>;

const MemeCanvasScreen: FC<Props> = ({navigation, route}) => {
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
        textElements: [],
        imageElements: [],
      }));
    }
  }, [route.params, route.params?.selectedTemplate]);

  const navigateToTemplateSelection = useCallback(() => {
    navigation.navigate('TemplateSelection');
  }, [navigation]);

  const handleUpdateCanvas = useCallback((updates: Partial<CanvasState>) => {
    setCanvasState(prev => ({...prev, ...updates}));
  }, []);

  const handleSelectElement = useCallback(
    (id: string | null, type: 'text' | 'image' | null) => {
      setSelectedElementId(id);
      setSelectedElementType(type);
    },
    [],
  );

  const handleClearSelection = useCallback(() => {
    setSelectedElementId(null);
    setSelectedElementType(null);
  }, []);

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
          onUpdateCanvas={handleUpdateCanvas}
          onSelectElement={handleSelectElement}
        />
      </View>

      {/* Bottom Controls */}
      <BottomControls
        selectedElementId={selectedElementId}
        selectedElementType={selectedElementType}
        canvasState={canvasState}
        onUpdateCanvas={handleUpdateCanvas}
        onClearSelection={handleClearSelection}
      />
    </SafeAreaView>
  );
};

export default MemeCanvasScreen;
