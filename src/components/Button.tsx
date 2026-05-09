import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors } from '../colors/Colors';
import { Typography } from './Typography';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  loading = false,
  style,
  textStyle,
  disabled,
  ...rest
}) => {
  const isOutline = variant === 'outline';
  const isText = variant === 'text';

  const getBackgroundColor = () => {
    if (isOutline || isText) return 'transparent';
    if (variant === 'secondary') return colors.secondary;
    return colors.primary; // Default to primary
  };

  const getTextColor = () => {
    if (isOutline || isText) return colors.primary;
    if (variant === 'secondary') return colors.Dark;
    return '#FFFFFF';
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || loading}
      style={[
        styles.container,
        { backgroundColor: getBackgroundColor() },
        isOutline && styles.outlineStyle,
        (disabled || loading) && styles.disabledStyle,
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Typography
          variant="body"
          weight="600"
          color={getTextColor()}
          style={textStyle}
        >
          {title}
        </Typography>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 8,
    flexDirection: 'row',
  },
  outlineStyle: {
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  disabledStyle: {
    opacity: 0.6,
  },
});
