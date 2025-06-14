import { create } from 'zustand';
import { Platform } from 'react-native';

const themeSpacing = {
  0: 0,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
} as const;

const themeBorderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  button: 8,
  input: 8,
  card: 12,
  circle: 9999,
  actionIcon: 12,
} as const;

const themeFontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
} as const;

const themeLineHeights = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
  '2xl': 36,
  '3xl': 40,
  '4xl': 44,
} as const;

const themeFontWeights = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

const themeDimensions = {
  actionIcon: 48,
  actionIconContainer: 24,
  buttonHeight: 44,
  inputHeight: 44,
  tabBarHeight: 60,
  headerHeight: 56,
} as const;

const themeMinWidth = {
  iconButton: 80,
  button: 120,
} as const;


export type ThemeSpacing = typeof themeSpacing;
export type ThemeBorderRadius = typeof themeBorderRadius;
export type ThemeFontSizes = typeof themeFontSizes;
export type ThemeLineHeights = typeof themeLineHeights;
export type ThemeFontWeights = typeof themeFontWeights;
export type ThemeDimensions = typeof themeDimensions;
export type ThemeMinWidth = typeof themeMinWidth;

export interface ThemeColors {
  background: string;
  backgroundSecondary: string;
  border: string;
  borderLight: string;
  danger: string;
  dangerLight: string;
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
  muted: string;
  primary: string;
  primaryDark: string;
  primaryLight: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  surface: string;
  surfaceSecondary: string;
  placeholderText: string;
  white: string;
  black: string;
  gray50: string;
  gray100: string;
  gray200: string;
  gray300: string;
  gray400: string;
  gray500: string;
  gray600: string;
  gray700: string;
  gray800: string;
  gray900: string;
}

export interface ThemeShadows {
  none: {};
  sm: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
  md: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
  lg: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
  button: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
  buttonPressed: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
  card: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
}

export interface ThemeFontFamily {
  sans: string[];
  mono: string[];
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  shadows: ThemeShadows;
  fontSizes: ThemeFontSizes;
  lineHeights: ThemeLineHeights;
  fontWeights: ThemeFontWeights;
  fontFamily: ThemeFontFamily;
  minWidth: ThemeMinWidth;
  dimensions: ThemeDimensions;
}

export interface ThemeState {
  theme: Theme;
  setTheme: (theme: Partial<Theme>) => void;
  getColor: (colorKey: keyof ThemeColors) => string;
  getSpacing: (spacingKey: keyof ThemeSpacing) => number;
  getBorderRadius: (radiusKey: keyof ThemeBorderRadius) => number;
  getShadow: (shadowKey: keyof ThemeShadows) => ThemeShadows[typeof shadowKey];
  getFontSize: (sizeKey: keyof ThemeFontSizes) => ThemeFontSizes[typeof sizeKey];
  getLineHeight: (lineHeightKey: keyof ThemeLineHeights) => ThemeLineHeights[typeof lineHeightKey];
  getFontWeight: (weightKey: keyof ThemeFontWeights) => ThemeFontWeights[typeof weightKey];
  getDimension: (dimensionKey: keyof ThemeDimensions) => ThemeDimensions[typeof dimensionKey];
}

const defaultTheme: Theme = {
  colors: {
    background: '#f7f9fb',
    backgroundSecondary: '#f1f5f9',
    border: '#e5e7eb',
    borderLight: '#f3f4f6',
    danger: '#ef4444',
    dangerLight: '#fef2f2',
    success: '#22c55e',
    successLight: '#f0fdf4',
    warning: '#f59e0b',
    warningLight: '#fffbeb',
    muted: '#6b7280',
    primary: '#55a4ff',
    primaryDark: '#2a7ed9',
    primaryLight: '#a8d4ff',
    text: '#1a1a1a',
    textSecondary: '#374151',
    textMuted: '#9ca3af',
    surface: '#ffffff',
    surfaceSecondary: '#f8fafc',
    placeholderText: '#9ca3af',
    white: '#ffffff',
    black: '#000000',
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    gray400: '#9ca3af',
    gray500: '#6b7280',
    gray600: '#4b5563',
    gray700: '#374151',
    gray800: '#1f2937',
    gray900: '#111827',
  },
  spacing: themeSpacing,
  borderRadius: themeBorderRadius,
  shadows: {
    none: {},
    sm: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
    button: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    buttonPressed: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    card: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 6,
      elevation: 2,
    },
  },
  fontSizes: themeFontSizes,
  lineHeights: themeLineHeights,
  fontWeights: themeFontWeights,
  fontFamily: {
    sans: Platform.select({
      ios: ['Inter', 'System'],
      android: ['Inter', 'Roboto'],
      default: ['Inter'],
    }) as string[],
    mono: Platform.select({
      ios: ['SF Mono', 'Monaco'],
      android: ['Roboto Mono'],
      default: ['monospace'],
    }) as string[],
  },
  minWidth: themeMinWidth,
  dimensions: themeDimensions,
};


const useThemeStore = create<ThemeState>((set, get) => ({
  theme: defaultTheme,
  setTheme: (newTheme) =>
    set((state) => ({
      theme: {
        ...state.theme,
        ...newTheme,
      },
    })),
  getColor: (colorKey) => {
    const { theme } = get();
    return theme.colors[colorKey];
  },
  getSpacing: (spacingKey) => {
    const { theme } = get();
    return theme.spacing[spacingKey] || 0;
  },
  getBorderRadius: (radiusKey) => {
    const { theme } = get();
    return theme.borderRadius[radiusKey];
  },
  getShadow: (shadowKey) => {
    const { theme } = get();
    return theme.shadows[shadowKey];
  },
  getFontSize: (sizeKey) => {
    const { theme } = get();
    return theme.fontSizes[sizeKey];
  },
  getLineHeight: (lineHeightKey) => {
    const { theme } = get();
    return theme.lineHeights[lineHeightKey];
  },
  getFontWeight: (weightKey) => {
    const { theme } = get();
    return theme.fontWeights[weightKey];
  },
  getDimension: (dimensionKey) => {
    const { theme } = get();
    return theme.dimensions[dimensionKey];
  },
}));

export default useThemeStore;
