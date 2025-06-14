import { create } from 'zustand';
import { Platform } from 'react-native';

export interface ThemeColors {
  background: string;
  border: string;
  danger: string;
  muted: string;
  primary: string;
  primaryDark: string;
  primaryLight: string;
  text: string;
  textSecondary: string;
  surface: string; // For cards, inputs, etc.
  placeholderText: string;
  white: string;
  gray200: string;
}

export interface ThemeSpacing {
  0.5: number;
  1: number;
  2: number;
  3: number;
  4: number;
  6: number;
  8: number;
  12: number;
  16: number;
  [key: string]: number;
}

export interface ThemeBorderRadius {
  button: number;
  input: number;
  card: number;
  circle: number;
  actionIcon: number; // For action icon containers
}

export interface ThemeShadows {
  button: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number; // Android
  };
  buttonPressed: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number; // Android
  };
  card: {
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number; // Android
  };
}

export interface ThemeFontSizes {
  xs: 12;
  sm: 14;
  md: 16;
  lg: 18;
  xl: 20;
  '2xl': 24;
}

export interface ThemeFontFamily {
  sans: string[];
}

export interface ThemeMinWidth {
  iconButton: number;
}

export interface ThemeDimensions {
  actionIcon: number; // Size for action icon containers
  actionIconContainer: number;
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  shadows: ThemeShadows;
  fontSizes: ThemeFontSizes;
  fontFamily: ThemeFontFamily;
  minWidth: ThemeMinWidth;
  dimensions: ThemeDimensions;
}

export interface ThemeState {
  theme: Theme;
  setTheme: (theme: Partial<Theme>) => void;
  getColor: (colorKey: keyof ThemeColors) => string;
  getSpacing: (spacingKey: keyof ThemeSpacing | number) => number;
  getBorderRadius: (radiusKey: keyof ThemeBorderRadius) => number;
  getShadow: (shadowKey: keyof ThemeShadows) => ThemeShadows[typeof shadowKey];
  getFontSize: (sizeKey: keyof ThemeFontSizes) => ThemeFontSizes[typeof sizeKey];
  getDimension: (dimensionKey: keyof ThemeDimensions) => number;
}

const defaultTheme: Theme = {
  colors: {
    background: '#f7f9fb',
    border: '#e5e7eb',
    danger: '#ef4444',
    muted: '#6b7280',
    primary: '#55a4ff',
    primaryDark: '#2a7ed9',
    primaryLight: '#a8d4ff',
    text: '#1a1a1a',
    textSecondary: '#374151',
    surface: '#ffffff',
    placeholderText: '#9ca3af',
    white: '#ffffff',
    gray200: '#e5e7eb',
  },
  spacing: {
    0.5: 2,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    6: 24,
    8: 32,
    12: 48,
    16: 64,
  },
  borderRadius: {
    button: 8,
    input: 8,
    card: 12,
    circle: 9999,
    actionIcon: 12,
  },
  shadows: {
    button: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3, // Android elevation
    },
    buttonPressed: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1, // Android elevation
    },
    card: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 6,
      elevation: 2, // Android elevation
    },
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
  },
  fontFamily: {
    sans: Platform.select({
      ios: ['Inter', 'System'],
      android: ['Inter', 'Roboto'],
      default: ['Inter'],
    }) as string[],
  },
  minWidth: {
    iconButton: 80,
  },
  dimensions: {
    actionIcon: 48,
    actionIconContainer: 24,
  },
};

// Create the Zustand store
export const useThemeStore = create<ThemeState>((set, get) => ({
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
    if (typeof spacingKey === 'number') {return spacingKey;}
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
  getDimension: (dimensionKey) => {
    const { theme } = get();
    return theme.dimensions[dimensionKey];
  },
}));
