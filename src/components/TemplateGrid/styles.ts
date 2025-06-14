import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import useThemeStore from '../../stores/theme';

const useStyles = () => {
  const {
    getFontSize,
    getSpacing,
    getBorderRadius,
    getColor,
    getShadow,
    getFontWeight,
  } = useThemeStore();

  const styles = useMemo(() => StyleSheet.create({
    container: {
      backgroundColor: getColor('background'),
    },
    templateItem: {
      flex: 1,
      margin: 5,
      alignItems: 'center',
      backgroundColor: getColor('surface'),
      borderRadius: getBorderRadius('card'),
      minHeight: 180,
      borderWidth: 1,
      gap: 20,
      borderColor: getColor('borderLight'),
      ...getShadow('card'),
    },
    templateImage: {
      width: '100%',
      height: 120,
      borderRadius: getBorderRadius('lg'),
      backgroundColor: getColor('surfaceSecondary'),
      marginBottom: getSpacing(2),
    },
    templateName: {
      fontSize: getFontSize('sm'),
      fontWeight: getFontWeight('semibold'),
      textAlign: 'center',
      color: getColor('text'),
      marginBottom: getSpacing(1),
    },
  }), [getSpacing, getColor, getBorderRadius, getShadow, getFontSize, getFontWeight]);

  return styles;
};

export default useStyles;
