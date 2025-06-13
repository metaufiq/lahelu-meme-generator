// src/components/TemplateSelector/TemplateGrid.tsx
import React from 'react';
import {
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import {MemeTemplate} from '../../types';
import {MEME_TEMPLATES} from '../../constants';

interface Props {
  onSelectTemplate: (template: MemeTemplate) => void;
}

export const TemplateGrid: React.FC<Props> = ({onSelectTemplate}) => {
  const renderTemplate = ({item}: {item: MemeTemplate}) => (
    <TouchableOpacity
      style={styles.templateItem}
      onPress={() => onSelectTemplate(item)}>
      <Image source={{uri: item.thumbnail}} style={styles.templateImage} />
      <Text style={styles.templateName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={MEME_TEMPLATES}
      renderItem={renderTemplate}
      numColumns={2}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  templateItem: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  templateImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  templateName: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
});
