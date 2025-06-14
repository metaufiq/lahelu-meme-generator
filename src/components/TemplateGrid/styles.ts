import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useThemeStore } from '../../stores/theme';

const useStyles = () => {
  const getFontSize = useThemeStore(state=>state.getFontSize);

  const styles = useMemo(()=>StyleSheet.create({
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
      fontSize: getFontSize('sm'),
      textAlign: 'center',
    },
  }), [getFontSize]);


  return styles;
};

export default useStyles;
