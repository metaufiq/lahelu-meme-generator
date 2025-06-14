
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

const useStyles = () => {
  const styles = useMemo(() => StyleSheet.create({
    container:{
      position: 'absolute',
    },
    text:{
      fontWeight: 'bold',
    },
  }), [
  ]);

  return styles;
};

export default useStyles;
