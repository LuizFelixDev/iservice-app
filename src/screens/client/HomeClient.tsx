import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Screen, Typography, Spacer } from '@/components';
import { colors } from '@/colors/Colors';

export default function HomeClient() {
  return (
    <Screen backgroundColor={colors.background}>
      <Spacer size={40} />
      <View style={styles.container}>
        <Typography variant="h1" color={colors.primary}>Área do Cliente</Typography>
        <Spacer size={8} />
        <Typography variant="body" color={colors.onSurfaceVariant}>Aqui você poderá solicitar serviços em breve.</Typography>
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