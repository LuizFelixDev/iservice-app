import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Typography } from './Typography';
import { colors } from '../colors/Colors';

interface SocialButtonProps extends TouchableOpacityProps {
  title: string;
  provider: 'google' | 'facebook' | 'apple';
  loading?: boolean;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  title,
  provider,
  loading = false,
  disabled,
  style,
  ...rest
}) => {
  const getIconName = () => {
    switch (provider) {
      case 'google':
        return 'google';
      case 'facebook':
        return 'facebook-square';
      case 'apple':
        return 'apple1';
      default:
        return 'google';
    }
  };

  const getIconColor = () => {
    switch (provider) {
      case 'google':
        return '#DB4437'; // Google Red
      case 'facebook':
        return '#4267B2'; // Facebook Blue
      case 'apple':
        return '#000000'; // Apple Black
      default:
        return colors.Dark;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || loading}
      style={[
        styles.container,
        (disabled || loading) && styles.disabledStyle,
        style,
      ]}
      {...rest}
    >
      <View style={styles.iconContainer}>
        <AntDesign name={getIconName()} size={24} color={getIconColor()} />
      </View>

      <View style={styles.textContainer}>
        {loading ? (
          <ActivityIndicator color={colors.Dark} />
        ) : (
          <Typography variant="body" weight="600" color={colors.Dark}>
            {title}
          </Typography>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 52,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 16,
    marginVertical: 8,
    // Sombra leve para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    // Sombra para Android
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 40, // Para balancear com o iconContainer e manter o texto centralizado
  },
  disabledStyle: {
    opacity: 0.6,
  },
});
