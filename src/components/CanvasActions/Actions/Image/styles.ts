import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import useThemeStore from '../../../../stores/theme';

const useStyles = () => {
  const theme = useThemeStore((state) => state.theme);
  const getColor = useThemeStore((state) => state.getColor);
  const getSpacing = useThemeStore((state) => state.getSpacing);
  const getFontSize = useThemeStore(state=>state.getFontSize);

  const styles = useMemo(()=>StyleSheet.create({
    container: {
      padding: getSpacing(4),
    },
    controlGroup: {
      marginBottom: getSpacing(4),
    },
    label: {
      color: getColor('textSecondary'),
      fontSize: getFontSize('sm'),
      fontWeight: '500',
      marginBottom: getSpacing(2),
      fontFamily: theme.fontFamily.sans[0],
    },
    slider: {
      width: '100%',
      height: 40,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: getSpacing(2),
    },
  }), [getColor, getFontSize, getSpacing, theme.fontFamily.sans]);

  const sliderColors = useMemo(()=>({
    minimumTrackTintColor: getColor('primary'),
    maximumTrackTintColor: getColor('border'),
    thumbTintColor: getColor('primary'),
  }), [getColor]);

  return {
    styles,
    sliderColors,
  };
};

export default useStyles;
