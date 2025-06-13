import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MemeTemplate} from '../../types';
import {TemplateGrid} from '../../components/TemplateSelector/TemplateGrid';
import {RootStackParamList} from '../../routes/types';
import styles from './styles';

type TemplateSelectionScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'TemplateSelection'
>;

// Template Selection Screen
const TemplateSelectionScreen: React.FC<TemplateSelectionScreenProps> = ({
  navigation,
}) => {
  const handleSelectTemplate = (template: MemeTemplate) => {
    navigation.navigate('MemeCanvas', {selectedTemplate: template});
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Choose a Meme Template</Text>
      <TemplateGrid onSelectTemplate={handleSelectTemplate} />
    </SafeAreaView>
  );
};

export default TemplateSelectionScreen;
