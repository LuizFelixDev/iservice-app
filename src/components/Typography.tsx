import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { colors } from '../colors/Colors';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  weight?: 'normal' | 'bold' | '600' | '500';
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  color = colors.Dark,
  align = 'left',
  weight,
  style,
  children,
  ...rest
}) => {
  return (
    <Text
      style={[
        styles[variant],
        { color, textAlign: align },
        weight ? { fontWeight: weight } : {},
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  h2: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  caption: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#6B7280', // Tailwind gray-500
  },
});
