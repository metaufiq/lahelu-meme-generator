import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

const useStyles = () => {
  const styles = useMemo(() => StyleSheet.create({
    container: {
      position: 'absolute',
    },
    textContainer: {
      paddingHorizontal: 4,
      paddingVertical: 2,
      borderRadius: 4,
    },
    text: {
      fontWeight: 'bold',
    },
  }), []);

  return styles;
};

export default useStyles;
