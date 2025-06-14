// TextActions/styles.ts
import { useCallback, useMemo } from 'react';
import { StyleSheet, ViewStyle  } from 'react-native';

import useThemeStore from '../../../../stores/theme';

const useStyles = () => {
  const theme = useThemeStore((state) => state.theme);
  const getColor = useThemeStore((state) => state.getColor);
  const getSpacing = useThemeStore((state) => state.getSpacing);
  const getBorderRadius = useThemeStore((state) => state.getBorderRadius);
  const getFontSize = useThemeStore((state) => state.getFontSize);

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
    },
    tabContent: {
      padding: getSpacing(4),
    },

    textInput: {
      borderWidth: 1,
      borderColor: getColor('border'),
      paddingHorizontal: getSpacing(3),
      paddingVertical: getSpacing(1),
      marginBottom: getSpacing(4),
      backgroundColor: getColor('surface'),
      borderRadius: getBorderRadius('input'),
      fontSize: getFontSize('md'),
      fontFamily: theme.fontFamily.sans[0],
      color: getColor('text'),
      minHeight: 48,
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
    colorPickerContainer: {
      marginBottom: getSpacing(4),
    },
    colorPickerLabel: {
      color: getColor('textSecondary'),
      fontSize: getFontSize('sm'),
      fontWeight: '500',
      fontFamily: theme.fontFamily.sans[0],
      marginBottom: getSpacing(2),
    },
    colorRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: getSpacing(2),
    },
    colorButton: {
      width: 32,
      height: 32,
      borderRadius: getBorderRadius('circle'),
      borderWidth: 2,
      borderColor: getColor('border'),
      justifyContent: 'center',
      alignItems: 'center',
    },
    colorButtonSelected: {
      borderWidth: 3,
      borderColor: getColor('primary'),
    },
    fontFamilyContainer: {
      marginBottom: getSpacing(4),
    },
    fontFamilyButtons: {
      gap: getSpacing(2),
    },
    fontFamilyButton: {
      paddingHorizontal: getSpacing(3),
      paddingVertical: getSpacing(2),
      borderRadius: getBorderRadius('button'),
      borderWidth: 1,
      borderColor: getColor('border'),
      backgroundColor: getColor('surface'),
    },
    fontFamilyButtonSelected: {
      backgroundColor: getColor('primary'),
      borderColor: getColor('primary'),
    },
    fontFamilyButtonText: {
      fontSize: getFontSize('sm'),
      color: getColor('text'),
      fontFamily: theme.fontFamily.sans[0],
      textAlign: 'center',
    },
    fontFamilyButtonTextSelected: {
      color: getColor('primary'),
      fontWeight: '600',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: getSpacing(2),
      flexWrap: 'wrap',
    },
  }), [getSpacing, getColor, getBorderRadius, getFontSize, theme.fontFamily.sans]);

  const getColorButtonStyle = useCallback((color: string, isSelected: boolean): ViewStyle => {
    const baseStyle = {
      ...styles.colorButton,
      backgroundColor: color === 'transparent' ? 'transparent' : color,
    };

    if (isSelected) {
      return {
        ...baseStyle,
        ...styles.colorButtonSelected,
      };
    }

    return baseStyle;
  }, [styles.colorButton, styles.colorButtonSelected]);

  const getFontFamilyButtonStyle = useCallback((isSelected: boolean): ViewStyle => {
    if (isSelected) {
      return {
        ...styles.fontFamilyButton,
        ...styles.fontFamilyButtonSelected,
      };
    }
    return styles.fontFamilyButton;
  }, [styles.fontFamilyButton, styles.fontFamilyButtonSelected]);

  const sliderColors = useMemo(() => ({
    minimum: getColor('primary'),
    maximum: getColor('border'),
    thumb: getColor('primary'),
  }), [getColor]);

  return {
    containerStyle: styles.container,
    tabContentStyle: styles.tabContent,
    textInputStyle: styles.textInput,
    labelStyle: styles.label,
    sliderContainerStyle: styles.sliderContainer,
    sliderStyle: styles.slider,
    colorPickerContainerStyle: styles.colorPickerContainer,
    colorPickerLabelStyle: styles.colorPickerLabel,
    colorRowStyle: styles.colorRow,
    colorButtonStyle: styles.colorButton,
    fontFamilyContainerStyle: styles.fontFamilyContainer,
    fontFamilyButtonStyle: styles.fontFamilyButtons,
    fontFamilyButtonTextStyle: styles.fontFamilyButtonText,
    buttonContainerStyle: styles.buttonContainer,
    getColorButtonStyle,
    getFontFamilyButtonStyle,
    sliderColors,
    placeholderTextColor: getColor('placeholderText'),
  };
};

export default useStyles;
