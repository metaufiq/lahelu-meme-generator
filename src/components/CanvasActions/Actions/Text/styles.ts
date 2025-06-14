// TextActions/styles.ts
import { useCallback, useMemo } from 'react';
import { StyleSheet, ViewStyle  } from 'react-native';

import { useThemeStore } from '../../../../stores/theme';

const useStyles = () => {
  const theme = useThemeStore((state) => state.theme);
  const getColor = useThemeStore((state) => state.getColor);
  const getSpacing = useThemeStore((state) => state.getSpacing);
  const getBorderRadius = useThemeStore((state) => state.getBorderRadius);
  const getFontSize = useThemeStore((state) => state.getFontSize);

  const styles = useMemo(() => StyleSheet.create({
    container: {
      padding: getSpacing(4),
    },
    textInput: {
      borderWidth: 1,
      borderColor: getColor('border'),
      padding: getSpacing(3),
      marginBottom: getSpacing(4),
      backgroundColor: getColor('surface'),
      borderRadius: getBorderRadius('input'),
      fontSize: getFontSize('md'),
      fontFamily: theme.fontFamily.sans[0],
      color: getColor('text'),
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
    },
    colorPickerLabel: {
      color: getColor('textSecondary'),
      fontSize: getFontSize('sm'),
      fontWeight: '500',
      fontFamily: theme.fontFamily.sans[0],
      marginRight: getSpacing(3),
    },
    colorButton: {
      width: 32,
      height: 32,
      borderRadius: getBorderRadius('circle'),
      marginLeft: getSpacing(2),
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
    },
  }), [
    getColor,
    getSpacing,
    getBorderRadius,
    getFontSize,
    theme.fontFamily.sans,
  ]);

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
