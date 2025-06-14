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
      padding: getSpacing(2.5),
      backgroundColor: getColor('background'),
    },
    templateItem: {
      flex: 1,
      margin: 5, // Using template-specific spacing
      alignItems: 'center',
      backgroundColor: getColor('surface'),
      borderRadius: getBorderRadius('card'),
      padding: getSpacing(3),
      minHeight: 180,
      borderWidth: 1,
      borderColor: getColor('borderLight'),
      ...getShadow('card'),
    },
    templateImage: {
      width: 120,
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
