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
}

export interface ThemeSpacing {
  0.5: number;
  1: number;
  2: number;
  3: number;
  4: number;
  6: number;
  8: number;
  [key: string]: number;
}

export interface ThemeBorderRadius {
  button: number;
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
}

export interface ThemeFontFamily {
  sans: string[];
}

export interface ThemeMinWidth {
  iconButton: number;
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  shadows: ThemeShadows;
  fontFamily: ThemeFontFamily;
  minWidth: ThemeMinWidth;
}

export interface ThemeState {
  theme: Theme;
  setTheme: (theme: Partial<Theme>) => void;
  getColor: (colorKey: keyof ThemeColors) => string;
  getSpacing: (spacingKey: keyof ThemeSpacing | number) => number;
  getBorderRadius: (radiusKey: keyof ThemeBorderRadius) => number;
  getShadow: (shadowKey: keyof ThemeShadows) => ThemeShadows[keyof ThemeShadows];
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
  },
  spacing: {
    0.5: 2,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    6: 24,
    8: 32,
  },
  borderRadius: {
    button: 8,
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
}));