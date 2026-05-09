import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Typography, Button, SocialButton, Screen, Spacer, ControlledInput } from '@/components';
import { useAuth } from '@/contexts/AuthContext';
import { colors } from '@/colors/Colors';

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
});

const loginSchema = z.object({
  email: z.string().min(1, 'E-mail é obrigatório').email('Digite um e-mail válido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const { signIn, signInWithGoogle, loading } = useAuth();
  const [isSubmittingGoogle, setIsSubmittingGoogle] = useState(false);

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const handleGoogleSignIn = async () => {
    try {
      setIsSubmittingGoogle(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      
      const idToken = userInfo.data?.idToken || (userInfo as any).idToken;
      
      if (idToken) {
        await signInWithGoogle(idToken);
      } else {
        Alert.alert('Erro', 'Não foi possível obter o token do Google.');
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Erro', 'Google Play Services não está disponível ou está desatualizado.');
      } else {
        console.error(error);
        Alert.alert('Erro', 'Ocorreu um erro ao fazer login com o Google.');
      }
    } finally {
      setIsSubmittingGoogle(false);
    }
  };

  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      await signIn({ email: data.email, password: data.password });
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Credenciais inválidas.');
    }
  };

  return (
    <Screen scrollable backgroundColor="#FFFFFF">
      <Spacer size={40} />
      <View style={styles.header}>
        <Typography variant="h1" color={colors.primary}>Bem-vindo ao iService</Typography>
        <Typography variant="body">Conectando você aos melhores profissionais da região.</Typography>
      </View>

      <View style={styles.form}>
        <ControlledInput
          control={control}
          name="email"
          label="E-mail"
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          iconName="mail"
        />
        
        <ControlledInput
          control={control}
          name="password"
          label="Senha"
          placeholder="Digite sua senha"
          isPassword
          iconName="lock"
        />

        <View style={styles.forgotPasswordContainer}>
          <Button 
            title="Esqueceu a senha?" 
            variant="text" 
            textStyle={styles.forgotPasswordText}
            onPress={() => { /* TODO */ }}
          />
        </View>

        <Button 
          title="Entrar" 
          onPress={handleSubmit(onLoginSubmit)} 
          loading={loading && !isSubmittingGoogle} 
        />

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Typography variant="caption" style={styles.dividerText}>ou continue com</Typography>
          <View style={styles.divider} />
        </View>

        <SocialButton 
          title="Entrar com Google" 
          provider="google" 
          onPress={handleGoogleSignIn} 
          disabled={isSubmittingGoogle}
        />
      </View>

      <Spacer size={32} />
      
      <View style={styles.footer}>
        <Typography variant="body">Não tem uma conta? </Typography>
        <Button 
          title="Cadastre-se" 
          variant="text" 
          textStyle={styles.registerText}
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 32,
  },
  form: {
    width: '100%',
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  forgotPasswordText: {
    color: colors.secondary,
    fontWeight: '500',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginHorizontal: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 24,
  },
  registerText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});