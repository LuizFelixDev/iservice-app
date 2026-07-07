import React from 'react';
import { View, StyleSheet, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/contexts/AuthContext';
import { Screen, Typography, Button, Spacer } from '@/components';
import { colors } from '@/colors/Colors';

export default function ProfileScreen() {
  const { signOut, user, role, switchRole } = useAuth();
  const navigation = useNavigation<any>();

  const isProfessional = user?.roles?.includes('PROFESSIONAL') || user?.roles?.some((r: any) => r.name === 'PROFESSIONAL');

  const toggleSwitch = () => {
    switchRole(role === 'PROFESSIONAL' ? 'USER' : 'PROFESSIONAL');
  };

  return (
    <Screen scrollable backgroundColor={colors.background}>
      <Spacer size={40} />
      
      <View style={styles.header}>
        <Typography variant="h1" color={colors.primary}>Meu Perfil</Typography>
      </View>

      <View style={styles.card}>
        <Typography variant="caption" color={colors.onSurfaceVariant}>E-mail</Typography>
        <Typography variant="body" weight="600">{user?.email}</Typography>
        
        <Spacer size={16} />
        
        <Typography variant="caption" color={colors.onSurfaceVariant}>Modo de Visualização</Typography>
        <Typography variant="body" weight="600">
          {role === 'PROFESSIONAL' ? 'Modo Profissional (Radar)' : 'Modo Cliente'}
        </Typography>

        {isProfessional && (
          <>
            <Spacer size={16}/>
            <Typography variant="caption" color={colors.onSurfaceVariant}>
              Visualizações do Perfil
            </Typography>

            <Typography variant="body" weight="600">
              👁 {user?.profile?.views ?? 0}
            </Typography>

            <View style={styles.switchContainer}>
              <Typography variant="body" weight="500">
                Ativar Modo Profissional
              </Typography>

              <Switch
                trackColor={{
                  false: '#767577',
                  true: colors.primaryFixedDim,
                }}
                thumbColor={
                  role === 'PROFESSIONAL'
                    ? colors.primary
                    : '#f4f3f4'
                }
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={role === 'PROFESSIONAL'}
              />
            </View>
          </>
        )}
      </View>

      <Spacer size={24} />

      {!isProfessional && (
        <>
          <Button 
            title="Quero ser um Profissional" 
            onPress={() => navigation.navigate('UpdateProfile')} 
          />
          <Spacer size={16} />
        </>
      )}

      <Button 
        title="Sair da Conta" 
        variant="outline" 
        onPress={signOut} 
        style={styles.logoutButton}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#F9FAFB',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  logoutButton: {
    borderColor: colors.error,
  }
});