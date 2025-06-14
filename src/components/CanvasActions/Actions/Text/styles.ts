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
  const getLineHeight = useThemeStore((state) => state.getLineHeight);

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
      paddingVertical: getSpacing(3),
      marginBottom: getSpacing(4),
      backgroundColor: getColor('surface'),
      borderRadius: getBorderRadius('input'),
      fontSize: getFontSize('md'),
      fontFamily: theme.fontFamily.sans[0],
      color: getColor('text'),
      minHeight: 44, // Ensures minimum touch target and text visibility
      textAlignVertical: 'center', // Centers text vertically on Android
      includeFontPadding: false, // Removes extra padding on Android
      lineHeight: getLineHeight('md'), // Provides proper line spacing
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
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: getSpacing(4),
      flexWrap: 'wrap',
    },
    colorPickerLabel: {
      color: getColor('textSecondary'),
      fontSize: getFontSize('sm'),
      fontWeight: '500',
      fontFamily: theme.fontFamily.sans[0],
      marginRight: getSpacing(3),
      marginBottom: getSpacing(2),
      width: '100%',
    },
    colorButton: {
      width: 32,
      height: 32,
      borderRadius: getBorderRadius('circle'),
      marginLeft: getSpacing(2),
      marginBottom: getSpacing(2),
      borderWidth: 2,
      borderColor: getColor('border'),
    },
    colorButtonSelected: {
      borderWidth: 3,
      borderColor: getColor('primary'),
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: getSpacing(2),
      flexWrap: 'wrap',
    },
  }), [getSpacing, getColor, getBorderRadius, getFontSize, theme.fontFamily.sans, getLineHeight]);

  const getColorButtonStyle = useCallback((color: string, isSelected: boolean): ViewStyle => {
    return {
      ...styles.colorButton,
      backgroundColor: color,
      ...(isSelected && styles.colorButtonSelected),
    };
  }, [styles.colorButton, styles.colorButtonSelected]);

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
    colorButtonStyle: styles.colorButton,
    buttonContainerStyle: styles.buttonContainer,
    getColorButtonStyle,
    sliderColors,
    placeholderTextColor: getColor('placeholderText'),
  };
};

export default useStyles;
