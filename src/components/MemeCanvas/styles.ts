import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import useThemeStore from '../../stores/theme';

const useStyles = () => {
  const getColor = useThemeStore(state => state.getColor);
  const getShadow = useThemeStore(state => state.getShadow);
  const getSpacing = useThemeStore(state => state.getSpacing);
  const getBorderRadius = useThemeStore(state => state.getBorderRadius);
  const getFontSize = useThemeStore(state => state.getFontSize);
  const getLineHeight = useThemeStore(state => state.getLineHeight);
  const getFontWeight = useThemeStore(state => state.getFontWeight);

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: getColor('background'),
    },
    canvas: {
      backgroundColor: getColor('surface'),
      borderRadius: getBorderRadius('card'),
      borderWidth: 1,
      borderColor: getColor('borderLight'),
      ...getShadow('card'),
    },
    emptyCanvas: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: getSpacing(6),
    },
    emptyCanvasText: {
      color: getColor('textSecondary'),
      fontSize: getFontSize('md'),
      lineHeight: getLineHeight('md'),
      fontWeight: getFontWeight('normal'),
      textAlign: 'center',
      marginTop: getSpacing(4),
    },
    emptyCanvasSubtext: {
      color: getColor('textMuted'),
      fontSize: getFontSize('sm'),
      lineHeight: getLineHeight('sm'),
      fontWeight: getFontWeight('normal'),
      textAlign: 'center',
      marginTop: getSpacing(1),
    },
  }), [getColor, getShadow, getSpacing, getBorderRadius, getFontSize, getLineHeight, getFontWeight]);

  return styles;
};

export default useStyles;
