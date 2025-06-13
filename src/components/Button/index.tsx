import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
} from 'react-native';

export interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  title?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  textStyle,
  onPress,
  ...props
}) => {
  const isDisabled = disabled || loading;

  // Base button styles
  const baseButtonClass = 'flex-row items-center justify-center rounded-lg';

  // Size variants
  const sizeClasses = {
    sm: 'px-3 py-2 min-h-[32px]',
    md: 'px-4 py-3 min-h-[44px]',
    lg: 'px-6 py-4 min-h-[52px]',
    xl: 'px-8 py-5 min-h-[60px]',
  };

  // Color variants
  const variantClasses = {
    primary: isDisabled ? 'bg-gray-300' : 'bg-primary active:bg-primaryDark',
    secondary: isDisabled
      ? 'bg-gray-300'
      : 'bg-gray-100 active:bg-gray-200 border border-gray-300',
    outline: isDisabled
      ? 'border border-gray-300 bg-transparent'
      : 'border border-primary bg-transparent active:bg-primaryLight active:bg-opacity-20',
    ghost: isDisabled ? 'bg-transparent' : 'bg-transparent active:bg-gray-100',
    danger: isDisabled ? 'bg-gray-300' : 'bg-red-500 active:bg-red-600',
  };

  // Text color variants
  const textColorClasses = {
    primary: isDisabled ? 'text-gray-500' : 'text-white',
    secondary: isDisabled ? 'text-gray-500' : 'text-text',
    outline: isDisabled ? 'text-gray-500' : 'text-primary',
    ghost: isDisabled ? 'text-gray-500' : 'text-text',
    danger: isDisabled ? 'text-gray-500' : 'text-white',
  };

  // Text size variants
  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  // Full width class
  const widthClass = fullWidth ? 'w-full' : '';

  // Combine all classes
  const buttonClassName = [
    baseButtonClass,
    sizeClasses[size],
    variantClasses[variant],
    widthClass,
  ].join(' ');

  const textClassName = [
    'font-sans font-medium',
    textColorClasses[variant],
    textSizeClasses[size],
  ].join(' ');

  // Icon spacing
  const iconSpacing =
    size === 'sm' ? 'mx-1' : size === 'md' ? 'mx-1.5' : 'mx-2';

  // Render content (title or children)
  const renderContent = () => {
    if (title) {
      return (
        <Text className={textClassName} style={textStyle} numberOfLines={1}>
          {title}
        </Text>
      );
    }
    return children;
  };

  return (
    <TouchableOpacity
      className={buttonClassName}
      disabled={isDisabled}
      onPress={onPress}
      style={style}
      activeOpacity={0.8}
      {...props}>
      {loading && (
        <ActivityIndicator
          size={size === 'sm' ? 'small' : 'small'}
          color={
            variant === 'primary' || variant === 'danger'
              ? '#ffffff'
              : variant === 'outline'
                ? '#55a4ff'
                : '#6b7280'
          }
          className={`${iconSpacing}`}
        />
      )}

      {!loading && leftIcon && (
        <Text className={`${iconSpacing}`}>{leftIcon}</Text>
      )}

      {renderContent()}

      {!loading && rightIcon && (
        <Text className={`${iconSpacing}`}>{rightIcon}</Text>
      )}
    </TouchableOpacity>
  );
};
