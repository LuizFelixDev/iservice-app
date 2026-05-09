import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Typography } from '../../components/Typography';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';
import { colors } from '../../colors/Colors';

export default function RegisterScreen() {
  const navigation = useNavigation<any>();
  const { register, loading } = useAuth();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await register({ firstName, lastName, email, password });
      Alert.alert('Sucesso', 'Conta criada com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível criar a conta. Verifique os dados e tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Typography variant="h1" color={colors.primary}>Criar Conta</Typography>
          <Typography variant="body">Preencha os dados para começar</Typography>
        </View>

        <View style={styles.form}>
          <View style={styles.row}>
            <Input
              containerStyle={{ flex: 1, marginRight: 8 }}
              label="Nome"
              placeholder="Ex: João"
              iconName="user"
              value={firstName}
              onChangeText={setFirstName}
            />
            <Input
              containerStyle={{ flex: 1, marginLeft: 8 }}
              label="Sobrenome"
              placeholder="Ex: Silva"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          <Input
            label="E-mail"
            placeholder="Digite seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            iconName="mail"
            value={email}
            onChangeText={setEmail}
          />
          
          <Input
            label="Senha"
            placeholder="Digite sua senha"
            isPassword
            iconName="lock"
            value={password}
            onChangeText={setPassword}
          />
          
          <Input
            label="Confirmar Senha"
            placeholder="Confirme sua senha"
            isPassword
            iconName="check-circle"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <View style={styles.buttonSpacing}>
            <Button 
              title="Cadastrar" 
              onPress={handleRegister} 
              loading={isSubmitting || loading} 
            />
          </View>
        </View>

        <View style={styles.footer}>
          <Typography variant="body">Já tem uma conta? </Typography>
          <Button 
            title="Faça login" 
            variant="text" 
            textStyle={styles.loginText}
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 32,
    marginTop: 40,
  },
  form: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSpacing: {
    marginTop: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  loginText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});