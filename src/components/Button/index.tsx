import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import useStyles from './styles';

export interface Props extends Omit<TouchableOpacityProps, 'style'> {
  title?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<Props> = ({
  title,
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  onPress,
  ...props
}) => {
  const isDisabled = disabled || loading;

  const {
    buttonStyle,
    textStyle: computedTextStyle,
    iconSpacingStyle,
    loadingColor,
  } = useStyles({
    variant,
    size,
    isDisabled,
  });

  // Combine computed styles with custom overrides
  const finalButtonStyle = [...buttonStyle, style];
  const finalTextStyle = [...computedTextStyle, textStyle];

  // Render content (title or children)
  const renderContent = () => {
    if (title) {
      return (
        <Text style={finalTextStyle} numberOfLines={1}>
          {title}
        </Text>
      );
    }
    return children;
  };

  return (
    <TouchableOpacity
      style={finalButtonStyle}
      disabled={isDisabled}
      onPress={onPress}
      activeOpacity={0.8}
      {...props}>
      {loading && (
        <ActivityIndicator
          size={size === 'sm' ? 'small' : 'small'}
          color={loadingColor}
          style={iconSpacingStyle}
        />
      )}

      {!loading && leftIcon && <Text style={iconSpacingStyle}>{leftIcon}</Text>}

      {renderContent()}

      {!loading && rightIcon && (
        <Text style={iconSpacingStyle}>{rightIcon}</Text>
      )}
    </TouchableOpacity>
  );
};
