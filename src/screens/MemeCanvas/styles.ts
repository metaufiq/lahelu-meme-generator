import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import useThemeStore from '../../stores/theme';

const useStyles = () => {
  const theme = useThemeStore((state) => state.theme);
  const getColor = useThemeStore((state) => state.getColor);
  const getSpacing = useThemeStore((state) => state.getSpacing);
  const getFontSize = useThemeStore((state) => state.getFontSize);
  const getLineHeight = useThemeStore((state) => state.getLineHeight);
  const getFontWeight = useThemeStore((state) => state.getFontWeight);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        // Container styles
        safeArea: {
          flex: 1,
          backgroundColor: getColor('background'),
        },
        container: {
          flex: 1,
        },

        // Empty state styles
        emptyStateContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: getSpacing(6),
        },
        emptyStateContent: {
          alignItems: 'center',
        },

        // Text styles
        title: {
          fontSize: getFontSize('3xl'),
          fontWeight: getFontWeight('bold'),
          color: getColor('text'),
          marginBottom: getSpacing(2),
          fontFamily: theme.fontFamily.sans[0],
          lineHeight: getLineHeight('3xl'),
        },
        subtitle: {
          fontSize: getFontSize('lg'),
          color: getColor('muted'),
          textAlign: 'center',
          marginBottom: getSpacing(8),
          fontFamily: theme.fontFamily.sans[0],
          lineHeight: getLineHeight('lg'),
        },

        // Canvas container
        canvasContainer: {
          flex: 1,
        },
      }),
    [
      getColor,
      getSpacing,
      getFontSize,
      getLineHeight,
      getFontWeight,
      theme.fontFamily.sans,
    ]
  );

  return {
    styles,
  };
};

export default useStyles;
