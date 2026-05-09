import React from 'react';
import { View } from 'react-native';

interface SpacerProps {
  size?: number;
  horizontal?: boolean;
}

export const Spacer: React.FC<SpacerProps> = ({ size = 16, horizontal = false }) => {
  return (
    <View
      style={
        horizontal
          ? { width: size, height: '100%' }
          : { height: size, width: '100%' }
      }
    />
  );
};
