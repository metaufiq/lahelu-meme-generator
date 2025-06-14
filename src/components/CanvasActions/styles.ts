
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import useThemeStore from '../../stores/theme';

const useStyles = () => {
  const theme = useThemeStore((state) => state.theme);
  const getColor = useThemeStore((state) => state.getColor);
  const getSpacing = useThemeStore((state) => state.getSpacing);
  const getBorderRadius = useThemeStore((state) => state.getBorderRadius);
  const getFontSize = useThemeStore((state) => state.getFontSize);
  const getDimension = useThemeStore((state) => state.getDimension);

  const styles = useMemo(() => StyleSheet.create({
    // Container styles
    bottomBarContainer: {
      backgroundColor: getColor('white'),
      borderTopWidth: 1,
      borderTopColor: getColor('gray200'),
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
      width: getDimension('actionIcon'),
      height: getDimension('actionIcon'),
      backgroundColor: getColor('primary'),
      borderRadius: getBorderRadius('actionIcon'),
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
  }), [
    getColor,
    getSpacing,
    getBorderRadius,
    getFontSize,
    getDimension,
    theme.fontFamily.sans,
  ]);

  return styles;
};

export default useStyles;
