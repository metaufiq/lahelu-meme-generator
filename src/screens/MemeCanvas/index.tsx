import {FC, useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, View, Dimensions} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {captureRef} from 'react-native-view-shot';
import Share from 'react-native-share';

import {CanvasState, ElementType} from '../../types';
import CanvasActions from '../../components/CanvasActions';
import {RootStackParamList} from '../../routes/types';
import MemeCanvas from '../../components/MemeCanvas';
import {Button} from '../../components/Button';
import useStyles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'MemeCanvas'>;

const MemeCanvasScreen: FC<Props> = ({navigation, route}) => {
  const canvasRef = useRef<View>(null);
  const {styles} = useStyles();

  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null,
  );
  const [selectedElementType, setSelectedElementType] =
    useState<ElementType | null>(null);

  // Track current transform values for proper centering
  const [currentScale, setCurrentScale] = useState(1);
  const [currentTranslateX, setCurrentTranslateX] = useState(0);
  const [currentTranslateY, setCurrentTranslateY] = useState(0);

  // Get screen dimensions to calculate canvas size
  const screenDimensions = Dimensions.get('window');

  // Calculate canvas dimensions (adjust these values based on your actual canvas size)
  const canvasWidth = screenDimensions.width;
  const canvasHeight = screenDimensions.height * 0.7; // Assuming canvas takes 70% of screen height

  const [canvasState, setCanvasState] = useState<CanvasState>(() => ({
    template: route.params?.selectedTemplate || null,
    textElements: [],
    imageElements: [],
    scale: 1,
    translateX: 0,
    translateY: 0,
  }));

  const onShare = async () => {
    try {
      const url = await captureRef(canvasRef);
      await Share.open({
        url,
        filename: canvasState.template?.name,
      });
    } catch (error) {
      console.error('Export failed', error);
    }
  };

  const navigateToTemplateSelection = useCallback(() => {
    navigation.navigate('TemplateSelection', {
      onGoBack(template) {
        navigation.setParams({selectedTemplate: template});
        setCanvasState(prev => ({
          ...prev,
          template,
          textElements: [],
          imageElements: [],
        }));
      },
    });
  }, [navigation]);

  const handleUpdateCanvas = useCallback((updates: Partial<CanvasState>) => {
    setCanvasState(prev => ({...prev, ...updates}));
  }, []);

  const handleSelectElement = useCallback(
    (id: string | null, type: ElementType | null) => {
      setSelectedElementId(id);
      setSelectedElementType(type);
    },
    [],
  );

  const handleClearSelection = useCallback(() => {
    setSelectedElementId(null);
    setSelectedElementType(null);
  }, []);

  // Callback to receive transform updates from MemeCanvas
  const handleTransformUpdate = useCallback(
    (transform: {scale: number; translateX: number; translateY: number}) => {
      setCurrentScale(transform.scale);
      setCurrentTranslateX(transform.translateX);
      setCurrentTranslateY(transform.translateY);
    },
    [],
  );

  // Empty state when no template is selected
  if (!canvasState.template) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyStateContainer}>
          <View style={styles.emptyStateContent}>
            <Text style={styles.title}>Create Your Meme</Text>
            <Text style={styles.subtitle}>
              Choose a template to get started with your meme creation
            </Text>
            <Button
              onPress={navigateToTemplateSelection}
              title="Choose Template"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <MemeCanvas
          canvasState={canvasState}
          onUpdateCanvas={handleUpdateCanvas}
          onSelectElement={handleSelectElement}
          onTransformUpdate={handleTransformUpdate}
          ref={canvasRef}
        />
      </View>

      <CanvasActions
        selectedElementId={selectedElementId}
        selectedElementType={selectedElementType}
        canvasState={canvasState}
        onShare={onShare}
        onUpdateCanvas={handleUpdateCanvas}
        onClearSelection={handleClearSelection}
        canvasWidth={canvasWidth}
        canvasHeight={canvasHeight}
        currentScale={currentScale}
        currentTranslateX={currentTranslateX}
        currentTranslateY={currentTranslateY}
      />
    </SafeAreaView>
  );
};

export default MemeCanvasScreen;
