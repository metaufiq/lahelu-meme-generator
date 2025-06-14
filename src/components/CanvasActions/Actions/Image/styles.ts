import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import useThemeStore from '../../../../stores/theme';

const useStyles = () => {
  const theme = useThemeStore((state) => state.theme);
  const getColor = useThemeStore((state) => state.getColor);
  const getSpacing = useThemeStore((state) => state.getSpacing);
  const getFontSize = useThemeStore((state) => state.getFontSize);

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
    },
    tabContent: {
      padding: getSpacing(4),
    },
    label: {
      color: getColor('textSecondary'),
      fontSize: getFontSize('sm'),
      fontWeight: '500',
      fontFamily: theme.fontFamily.sans[0],
      marginBottom: getSpacing(2),
    },
    sliderContainer: {
      marginBottom: getSpacing(4),
    },
    slider: {
      width: '100%',
      height: 40,
    },
  }), [
    getColor,
    getSpacing,
    getFontSize,
    theme.fontFamily.sans,
  ]);

  const sliderColors = useMemo(() => ({
    minimum: getColor('primary'),
    maximum: getColor('border'),
    thumb: getColor('primary'),
  }), [getColor]);

  return {
    containerStyle: styles.container,
    tabContentStyle: styles.tabContent,
    labelStyle: styles.label,
    sliderContainerStyle: styles.sliderContainer,
    sliderStyle: styles.slider,
    sliderColors,
  };
};

export default useStyles;