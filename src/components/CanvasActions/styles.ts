
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import useThemeStore from '../../stores/theme';

export const ICON_SIZE = 24;
const ICON_SIZE_CONTAINER = 30;

const useStyles = () => {
  const theme = useThemeStore((state) => state.theme);
  const getColor = useThemeStore((state) => state.getColor);
  const getSpacing = useThemeStore((state) => state.getSpacing);
  const getFontSize = useThemeStore((state) => state.getFontSize);

  const styles = useMemo(() => StyleSheet.create({
    // Container styles
    bottomBarContainer: {
      backgroundColor: getColor('white'),
      borderTopWidth: 1,
      borderTopColor: getColor('border'),
    },

    // Add elements view
    addElementsContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      padding: getSpacing(1),
      justifyContent: 'center',
    },

    addElementsRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: getSpacing(8),
    },

    // Controls view
    controlsContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },

    controlsHeader: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },

    // Action button styles
    actionButtonContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },

    actionIconContainer: {
      width: ICON_SIZE_CONTAINER,
      height: ICON_SIZE_CONTAINER,
      backgroundColor: getColor('primary'),
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: getSpacing(2),
    },

    actionLabel: {
      color: getColor('primary'),
      fontFamily: theme.fontFamily.sans[0],
      fontWeight: '500',
      fontSize: getFontSize('sm'),
    },
  }), [getColor, getSpacing, getFontSize, theme.fontFamily.sans]);

  return styles;
};

export default useStyles;
