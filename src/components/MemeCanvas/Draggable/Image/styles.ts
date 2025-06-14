
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

const useStyles = () => {
  const styles = useMemo(() => StyleSheet.create({
    container:{
      position: 'absolute',
    },
  }), [
  ]);

  return styles;
};

export default useStyles;
