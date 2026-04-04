import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../Colors/Colors';

export default function SingIn({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Nova Conta</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Voltar para Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  button: {
    marginTop: 10
  },
  buttonText: {
    color: colors.secondary,
    fontWeight: 'bold'
  }
});