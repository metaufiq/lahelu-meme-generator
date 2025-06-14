
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useThemeStore } from '../../stores/theme';

const useStyles = () => {
  const getColor = useThemeStore(state=>state.getColor);

  const styles = useMemo(()=>StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
    },
    canvas: {
      backgroundColor: getColor('white'),
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    emptyCanvas: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  }), [getColor]);


  return styles;
};

export default useStyles;
