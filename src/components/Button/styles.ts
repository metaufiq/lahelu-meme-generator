import { useCallback, useMemo } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';

import useThemeStore from '../../stores/theme';
import { Props } from '.';

interface Params {
  variant: Props['variant'];
  size: Props['size'];
  isDisabled: boolean;
}

const useStyles = ({
  variant = 'primary',
  size = 'md',
  isDisabled,
}: Params) => {
  const theme = useThemeStore((state) => state.theme);
  const getColor = useThemeStore((state) => state.getColor);
  const getSpacing = useThemeStore((state) => state.getSpacing);
  const getBorderRadius = useThemeStore((state) => state.getBorderRadius);
  const getShadow = useThemeStore((state) => state.getShadow);
  const getFontSize = useThemeStore((state) => state.getFontSize);

  const styles = useMemo(()=>StyleSheet.create({
    // Base styles
    baseButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: getBorderRadius('button'),
      ...getShadow('button'),
    },
    baseButtonPressed: {
      ...getShadow('buttonPressed'),
    },

    // Size variants
    sizeSmall: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      minHeight: 32,
    },
    sizeMedium: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      minHeight: 44,
    },
    sizeLarge: {
      paddingHorizontal: 24,
      paddingVertical: 16,
      minHeight: 52,
    },
    sizeXLarge: {
      paddingHorizontal: 32,
      paddingVertical: 20,
      minHeight: 60,
    },

    // Variant styles - Enabled
    primaryEnabled: {
      backgroundColor: getColor('primary'),
    },
    secondaryEnabled: {
      backgroundColor: '#f3f4f6',
      borderWidth: 1,
      borderColor: '#d1d5db',
    },
    outlineEnabled: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: getColor('primary'),
    },
    ghostEnabled: {
      backgroundColor: 'transparent',
      shadowOpacity: 0,
      shadowRadius: 0,
      shadowOffset: { width: 0, height: 0 },
      elevation: 0,
    },
    dangerEnabled: {
      backgroundColor: getColor('danger'),
    },

    // Variant styles - Disabled
    primaryDisabled: {
      backgroundColor: getColor('muted'),
    },
    secondaryDisabled: {
      backgroundColor: '#f3f4f6',
      borderWidth: 1,
      borderColor: '#d1d5db',
    },
    outlineDisabled: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: getColor('muted'),
    },
    ghostDisabled: {
      backgroundColor: 'transparent',
      shadowOpacity: 0,
      shadowRadius: 0,
      shadowOffset: { width: 0, height: 0 },
      elevation: 0,
    },
    dangerDisabled: {
      backgroundColor: getColor('muted'),
    },

    // Text base styles
    baseText: {
      fontFamily: theme.fontFamily.sans[0],
      fontWeight: '500',
    },

    // Text size variants
    textSmall: {
      fontSize: getFontSize('sm'),
      lineHeight: 20,
    },
    textMedium: {
      fontSize: getFontSize('md'),
      lineHeight: 24,
    },
    textLarge: {
      fontSize: getFontSize('lg'),
      lineHeight: 28,
    },
    textXLarge: {
      fontSize: getFontSize('xl'),
      lineHeight: 32,
    },

    // Text color variants - Enabled
    textPrimaryEnabled: {
      color: '#ffffff',
    },
    textSecondaryEnabled: {
      color: getColor('text'),
    },
    textOutlineEnabled: {
      color: getColor('primary'),
    },
    textGhostEnabled: {
      color: getColor('text'),
    },
    textDangerEnabled: {
      color: '#ffffff',
    },

    // Text color variants - Disabled
    textPrimaryDisabled: {
      color: '#9ca3af',
    },
    textSecondaryDisabled: {
      color: '#9ca3af',
    },
    textOutlineDisabled: {
      color: '#9ca3af',
    },
    textGhostDisabled: {
      color: '#9ca3af',
    },
    textDangerDisabled: {
      color: '#9ca3af',
    },

    // Icon spacing
    iconContainerSmall: {
      marginHorizontal: getSpacing(0.5),
    },
    iconContainerMedium: {
      marginHorizontal: 6,
    },
    iconContainerLarge: {
      marginHorizontal: 8,
    },
  }), [getBorderRadius, getColor, getFontSize, getShadow, getSpacing, theme.fontFamily.sans]);

  // Helper functions to get computed styles
  const getSizeStyle = useCallback(() => {
    switch (size) {
      case 'sm':
        return styles.sizeSmall;
      case 'lg':
        return styles.sizeLarge;
      case 'xl':
        return styles.sizeXLarge;
      default:
        return styles.sizeMedium;
    }
  }, [size, styles.sizeLarge, styles.sizeMedium, styles.sizeSmall, styles.sizeXLarge]);

  const getVariantStyle = useCallback(() => {
    const suffix = isDisabled ? 'Disabled' : 'Enabled';
    const styleKey = `${variant}${suffix}` as const;
    return styles[styleKey];
  }, [isDisabled, styles, variant]);

  const getTextSizeStyle = useCallback(() => {
    switch (size) {
      case 'sm':
        return styles.textSmall;
      case 'lg':
        return styles.textLarge;
      case 'xl':
        return styles.textXLarge;
      default:
        return styles.textMedium;
    }
  }, [size, styles.textLarge, styles.textMedium, styles.textSmall, styles.textXLarge]);

  const getTextColorStyle = useCallback(() => {
    const suffix = isDisabled ? 'Disabled' : 'Enabled';
    const styleKey = `text${variant?.charAt(0).toUpperCase() + variant?.slice(1)}${suffix}` as keyof typeof styles;
    return styles[styleKey];
  },[isDisabled, styles, variant]);

  const getIconSpacingStyle = useCallback(() => {
    switch (size) {
      case 'sm':
        return styles.iconContainerSmall;
      case 'lg':
      case 'xl':
        return styles.iconContainerLarge;
      default:
        return styles.iconContainerMedium;
    }
  }, [size, styles.iconContainerLarge, styles.iconContainerMedium, styles.iconContainerSmall]);

  const getLoadingColor = useCallback(() => {
    if (variant === 'primary' || variant === 'danger') {
      return '#ffffff';
    } else if (variant === 'outline') {
      return getColor('primary');
    }
    return getColor('muted');
  }, [getColor, variant]);

  // Computed style combinations
  const buttonStyle:ViewStyle[] = useMemo(()=>{
    const result = [
    styles.baseButton,
    getSizeStyle(),
    getVariantStyle()];


   return result;
  }, [getSizeStyle, getVariantStyle, styles.baseButton]);

  const textStyle = useMemo(()=>[
    styles.baseText,
    getTextSizeStyle(),
    getTextColorStyle(),
  ],[getTextColorStyle, getTextSizeStyle, styles.baseText]);

  return {
    styles,
    buttonStyle,
    textStyle,
    iconSpacingStyle: getIconSpacingStyle(),
    loadingColor: getLoadingColor(),
    getSizeStyle,
    getVariantStyle,
    getTextSizeStyle,
    getTextColorStyle,
    getIconSpacingStyle,
    getLoadingColor,
  };
};

export default useStyles;
