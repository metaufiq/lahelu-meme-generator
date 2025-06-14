import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MemeTemplate} from '../../types';
import TemplateGrid from '../../components/TemplateGrid';
import {RootStackParamList} from '../../routes/types';
import {useTemplateStore} from '../../stores/template';
import styles from './styles';

type TemplateSelectionScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'TemplateSelection'
>;

const TemplateSelectionScreen: React.FC<TemplateSelectionScreenProps> = ({
  navigation,
}) => {
  const setSelectedTemplate = useTemplateStore(
    state => state.setSelectedTemplate,
  );
  const handleSelectTemplate = (template: MemeTemplate) => {
    setSelectedTemplate(template);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Choose a Meme Template</Text>
      <TemplateGrid onSelectTemplate={handleSelectTemplate} />
    </SafeAreaView>
  );
};

export default TemplateSelectionScreen;
