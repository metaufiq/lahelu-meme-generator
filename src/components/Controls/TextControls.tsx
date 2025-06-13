// src/components/Controls/TextControls.tsx
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {TextElement} from '../../types';

interface Props {
  element: TextElement | null;
  onUpdate: (element: TextElement) => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

export const TextControls: React.FC<Props> = ({
  element,
  onUpdate,
  onDelete,
  onDuplicate,
}) => {
  if (!element) return null;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={element.text}
        onChangeText={text => onUpdate({...element, text})}
        placeholder="Enter text..."
      />

      <View style={styles.sliderContainer}>
        <Text>Font Size: {Math.round(element.fontSize)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={12}
          maximumValue={72}
          value={element.fontSize}
          onValueChange={fontSize => onUpdate({...element, fontSize})}
        />
      </View>

      <View style={styles.colorContainer}>
        <Text>Color:</Text>
        {['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00'].map(
          color => (
            <TouchableOpacity
              key={color}
              style={[styles.colorButton, {backgroundColor: color}]}
              onPress={() => onUpdate({...element, color})}
            />
          ),
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onDuplicate}>
          <Text style={styles.buttonText}>Duplicate</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={onDelete}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  sliderContainer: {
    marginBottom: 16,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  colorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 8,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 12,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
