import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MemeTemplate} from '../../types';
import TemplateGrid from '../../components/TemplateGrid';
import {RootStackParamList} from '../../routes/types';
import styles from './styles';

type TemplateSelectionScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'TemplateSelection'
>;

const TemplateSelectionScreen: React.FC<TemplateSelectionScreenProps> = ({
  route,
  navigation,
}) => {
  const handleSelectTemplate = (template: MemeTemplate) => {
    route.params?.onGoBack?.(template);
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
