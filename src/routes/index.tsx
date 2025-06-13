import {Text} from 'react-native';

import {NavigationContainer, RouteProp} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import MemeCanvasScreen from '../screens/MemeCanvas';
import TemplateSelectionScreen from '../screens/TemplateSelection';
import {RootStackParamList} from './types';
import {Button} from '../components/Button';

// Navigation Stack
const Stack = createNativeStackNavigator<RootStackParamList>();

const _memeCanvasOption = ({
  route,
  navigation,
}: {
  route: RouteProp<RootStackParamList, 'MemeCanvas'>;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'MemeCanvas',
    undefined
  >;
  theme: ReactNavigation.Theme;
}) => ({
  title: !route.params?.selectedTemplate ? 'Meme Canvas' : '',
  headerLeft: () => route.params?.selectedTemplate && <Text>Meme Canvas</Text>,
  headerRight: () =>
    route.params?.selectedTemplate && (
      <Button onPress={() => navigation.push('TemplateSelection')} size="sm">
        <Text className="text-white">Change Template</Text>
      </Button>
    ),
});

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MemeCanvas">
        <Stack.Screen
          name="MemeCanvas"
          component={MemeCanvasScreen}
          options={_memeCanvasOption}
        />
        <Stack.Screen
          name="TemplateSelection"
          component={TemplateSelectionScreen}
          options={{title: 'Select Template', headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
