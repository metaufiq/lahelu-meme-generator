import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MemeCanvasScreen from '../screens/MemeCanvas';
import TemplateSelectionScreen from '../screens/TemplateSelection';
import {RootStackParamList} from './types';

// Navigation Stack
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MemeCanvas">
        <Stack.Screen
          name="MemeCanvas"
          component={MemeCanvasScreen}
          options={{title: 'Meme Canvas', headerShown: false}}
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
