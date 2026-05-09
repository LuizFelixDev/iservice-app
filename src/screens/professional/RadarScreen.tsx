import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen, Typography, Spacer } from '@/components';
import { colors } from '@/colors/Colors';

export default function RadarScreen() {
  return (
    <Screen backgroundColor={colors.background}>
      <Spacer size={40} />
      <View style={styles.container}>
        <Typography variant="h1" color={colors.primary}>Radar do Profissional</Typography>
        <Spacer size={8} />
        <Typography variant="body" color={colors.onSurfaceVariant}>Buscando serviços num raio de 10km...</Typography>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
});