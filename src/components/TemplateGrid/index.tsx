import React, {useCallback} from 'react';
import {FlatList, TouchableOpacity, Image, Text} from 'react-native';

import {MemeTemplate} from '../../types';
import useStyles from './styles';
import useCacheStatusStore, {
  State as CacheStatusState,
} from '../../stores/cacheStatus';

const MEME_TEMPLATES: MemeTemplate[] = [
  {
    id: '1',
    name: 'Drake Pointing',
    url: 'https://i.imgflip.com/30b1gx.jpg',
    thumbnail: 'https://i.imgflip.com/30b1gx.jpg',
    width: 500,
    height: 600,
  },
  {
    id: '2',
    name: 'Distracted Boyfriend',
    url: 'https://i.imgflip.com/1ur9b0.jpg',
    thumbnail: 'https://i.imgflip.com/1ur9b0.jpg',
    width: 500,
    height: 300,
  },
  // Add more templates if needed
];

interface Props {
  onSelectTemplate: (template: MemeTemplate) => void;
}

interface RenderTemplateProps extends Props {
  styles: ReturnType<typeof useStyles>;
  addImageToCacheMap: CacheStatusState['addImage'];
}

const _renderTemplate = ({
  onSelectTemplate,
  styles,
  addImageToCacheMap,
}: RenderTemplateProps) =>
  useCallback(
    ({item}: {item: MemeTemplate}) => (
      <TouchableOpacity
        style={styles.templateItem}
        onPress={() => onSelectTemplate(item)}>
        <Image
          source={{uri: item.thumbnail}}
          style={styles.templateImage}
          onLoad={() => addImageToCacheMap(item.url)}
        />
        <Text style={styles.templateName}>{item.name}</Text>
      </TouchableOpacity>
    ),
    [
      addImageToCacheMap,
      onSelectTemplate,
      styles.templateImage,
      styles.templateItem,
      styles.templateName,
    ],
  );

const TemplateGrid: React.FC<Props> = ({onSelectTemplate}) => {
  const styles = useStyles();
  const addImageToCacheMap = useCacheStatusStore(state => state.addImage);

  return (
    <FlatList
      data={MEME_TEMPLATES}
      renderItem={_renderTemplate({
        onSelectTemplate,
        styles,
        addImageToCacheMap,
      })}
      numColumns={2}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

export default TemplateGrid;
