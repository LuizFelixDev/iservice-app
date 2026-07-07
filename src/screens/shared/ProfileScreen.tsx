import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { Screen, Typography, Button, Spacer, ReportIssueModal } from '@/components';
import { colors } from '@/colors/Colors';

export default function ProfileScreen() {
  const { signOut, user, role, switchRole } = useAuth();
  const navigation = useNavigation<any>();
  const [reportModalVisible, setReportModalVisible] = React.useState(false);

  const isProfessional = user?.roles?.includes('PROFESSIONAL') || user?.roles?.some((r: any) => r.name === 'PROFESSIONAL');
  const avatarUrl = user?.profile?.photoUrl || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=200&auto=format&fit=crop';
  const fullName = user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Usuário';

  return (
    <Screen scrollable backgroundColor="#F8F9FB">
      <Spacer size={40} />
      
      {/* Header Profile */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: avatarUrl }} style={styles.avatar} />
          {isProfessional && (
            <View style={styles.verifiedBadge}>
              <MaterialCommunityIcons name="check-decagram" size={24} color="#00C853" />
            </View>
          )}
        </View>
        
        <Typography variant="h1" color="#1A1A1A" style={{ marginTop: 16 }}>{fullName}</Typography>
        <Typography variant="body" color="#666" style={{ marginTop: 4 }}>{user?.email}</Typography>
      </View>

      <Spacer size={32} />

      {/* Mode Selection */}
      <View style={styles.section}>
        <Typography variant="h3" color="#1A1A1A" style={{ marginBottom: 16 }}>Modo de Uso</Typography>
        
        <View style={styles.modeContainer}>
          <TouchableOpacity 
            style={[styles.modeCard, role === 'USER' && styles.modeCardActive]} 
            activeOpacity={0.7}
            onPress={() => switchRole('USER')}
          >
            <MaterialCommunityIcons name="account-search-outline" size={28} color={role === 'USER' ? colors.primary : '#888'} />
            <Typography variant="body" weight="700" color={role === 'USER' ? colors.primary : '#666'} style={{ marginTop: 8 }}>
              Sou Cliente
            </Typography>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.modeCard, role === 'PROFESSIONAL' && styles.modeCardActive, !isProfessional && { opacity: 0.5 }]} 
            activeOpacity={0.7}
            onPress={() => {
              if (isProfessional) {
                switchRole('PROFESSIONAL');
              } else {
                navigation.navigate('UpdateProfile');
              }
            }}
          >
            <MaterialCommunityIcons name="briefcase-outline" size={28} color={role === 'PROFESSIONAL' ? colors.primary : '#888'} />
            <Typography variant="body" weight="700" color={role === 'PROFESSIONAL' ? colors.primary : '#666'} style={{ marginTop: 8 }}>
              Sou Profissional
            </Typography>
          </TouchableOpacity>
        </View>
      </View>

      <Spacer size={24} />

      {/* Actions */}
      <View style={styles.section}>
        {!isProfessional ? (
          <TouchableOpacity style={styles.premiumBtn} onPress={() => navigation.navigate('UpdateProfile')} activeOpacity={0.8}>
            <MaterialCommunityIcons name="star-shooting" size={24} color="#FFF" style={{ marginRight: 8 }} />
            <Typography variant="body" weight="700" color="#FFF">Quero ser um Profissional</Typography>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('UpdateProfile')} activeOpacity={0.7}>
            <MaterialCommunityIcons name="card-account-details-outline" size={22} color="#444" style={{ marginRight: 12 }} />
            <Typography variant="body" weight="600" color="#444">Editar Cadastro Base (Bio, CPF)</Typography>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#CCC" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        )}

        <Spacer size={12} />

        <TouchableOpacity style={styles.reportBtn} onPress={() => setReportModalVisible(true)} activeOpacity={0.7}>
          <MaterialCommunityIcons name="alert-circle-outline" size={22} color="#666" style={{ marginRight: 12 }} />
          <Typography variant="body" weight="600" color="#666">Reportar um Erro</Typography>
        </TouchableOpacity>

        <Spacer size={12} />

        <TouchableOpacity style={styles.logoutBtn} onPress={signOut} activeOpacity={0.7}>
          <MaterialCommunityIcons name="logout" size={22} color={colors.error} style={{ marginRight: 12 }} />
          <Typography variant="body" weight="600" color={colors.error}>Sair da Conta</Typography>
        </TouchableOpacity>
      </View>

      <Spacer size={40} />

      <ReportIssueModal 
        visible={reportModalVisible} 
        onClose={() => setReportModalVisible(false)} 
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 2,
  },
  section: {
    paddingHorizontal: 20,
  },
  modeContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  modeCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#EAEAEA',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  modeCardActive: {
    borderColor: colors.primary,
    backgroundColor: '#FFF5EB',
  },
  premiumBtn: {
    flexDirection: 'row',
    backgroundColor: '#FF7A00',
    paddingVertical: 18,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#FF7A00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  actionBtn: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  reportBtn: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FB',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  logoutBtn: {
    flexDirection: 'row',
    backgroundColor: '#FFF0F0',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD6D6',
  }
});