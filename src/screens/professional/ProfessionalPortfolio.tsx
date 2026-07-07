import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator, Modal, TextInput, Alert, Switch, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { usersService, PortfolioResponseDto } from '../../services/users';
import { reviewsService, Review } from '../../services/reviews';
import { useAuth } from '@/contexts/AuthContext';
import { useRoute } from '@react-navigation/native';

export default function ProfessionalPortfolio() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PortfolioResponseDto | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  
  // Modal states for Project
  const [modalVisible, setModalVisible] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [addingProject, setAddingProject] = useState(false);
  const [projectError, setProjectError] = useState('');

  // Modal states for Certificate
  const [modalCertVisible, setModalCertVisible] = useState(false);
  const [newCertTitle, setNewCertTitle] = useState('');
  const [newCertDesc, setNewCertDesc] = useState('');
  const [addingCert, setAddingCert] = useState(false);
  const [certError, setCertError] = useState('');

  // Modal states for Edit Profile
  const [modalProfileVisible, setModalProfileVisible] = useState(false);
  const [editRoleTitle, setEditRoleTitle] = useState('');
  const [editBio, setEditBio] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileError, setProfileError] = useState('');

  // Status online state
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const { user } = useAuth();
  const route = useRoute<any>();

  const professionalId = route.params?.professionalId || user?.id;
  const isOwner = user?.id === professionalId;

  const fetchPortfolio = async () => {
    if (!professionalId) return;
    try {
      setLoading(true);
      const portfolioData = await usersService.getPortfolio(professionalId);
      setData(portfolioData);

      const reviewsData = await reviewsService.getUserReviews(professionalId);
      setReviews(reviewsData.reviews || []);
    } catch (error) {
      console.error('Failed to fetch portfolio', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, [professionalId]);

  const handleAddProject = async () => {
    if (!newProjectTitle || !newProjectDesc) {
      setProjectError('Preencha todos os campos obrigatórios');
      return;
    }
    setProjectError('');
    setAddingProject(true);
    try {
      const payload = {
        title: newProjectTitle,
        description: newProjectDesc,
      };
      
      await usersService.addPortfolioItem(payload);
      
      setModalVisible(false);
      setNewProjectTitle('');
      setNewProjectDesc('');
      fetchPortfolio(); // Refresh data
    } catch (error: any) {
      console.error('Error adding project:', error);
      Alert.alert('Erro', error.response?.data?.message || 'Não foi possível adicionar o projeto.');
    } finally {
      setAddingProject(false);
    }
  };

  const handleAddCertificate = async () => {
    if (!newCertTitle || !newCertDesc) {
      setCertError('Preencha todos os campos obrigatórios');
      return;
    }
    setCertError('');
    setAddingCert(true);
    try {
      await usersService.addCertificate({
        title: newCertTitle,
        description: newCertDesc,
        icon: 'medal-outline' // Default icon for now
      });
      
      setModalCertVisible(false);
      setNewCertTitle('');
      setNewCertDesc('');
      fetchPortfolio(); // Refresh data
    } catch (error: any) {
      console.error('Error adding certificate:', error);
      Alert.alert('Erro', error.response?.data?.message || 'Não foi possível adicionar o certificado.');
    } finally {
      setAddingCert(false);
    }
  };

  const openEditProfile = () => {
    setEditRoleTitle(data?.roleTitle || '');
    setEditBio(data?.bio || '');
    setProfileError('');
    setModalProfileVisible(true);
  };

  const handleSaveProfile = async () => {
    if (!editRoleTitle || !editBio) {
      setProfileError('Preencha todos os campos obrigatórios');
      return;
    }
    setProfileError('');
    setSavingProfile(true);
    try {
      const payload = {
        roleTitle: editRoleTitle,
        bio: editBio,
      };
      
      await usersService.updatePortfolio(payload);
      
      setModalProfileVisible(false);
      fetchPortfolio();
    } catch (error: any) {
      console.error('Error updating profile:', error);
      Alert.alert('Erro', error.response?.data?.message || 'Não foi possível atualizar o perfil.');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleEditCover = () => {
    Alert.alert('Em breve', 'A edição de imagens e destaques será integrada com a galeria em breve!');
  };

  const handleToggleStatus = async (value: boolean) => {
    if (!data) return;
    try {
      setIsUpdatingStatus(true);
      // Otimista (opcional) ou atualiza direto
      const updated = await usersService.updateStatus(value);
      setData({ ...data, isOnline: updated.isOnline });
    } catch (error) {
      console.error('Failed to update status', error);
      Alert.alert('Erro', 'Não foi possível atualizar o status.');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  if (loading || !data) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF7A00" />
        <Text style={styles.loadingText}>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Cover */}
        <View style={styles.headerContainer}>
          <Image source={{ uri: data.coverUrl || 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=1000&auto=format&fit=crop' }} style={styles.coverImage} />
          <View style={styles.overlay} />
          
          {isOwner && (
            <TouchableOpacity style={styles.editCoverBtn} onPress={handleEditCover}>
              <MaterialCommunityIcons name="pencil-outline" size={20} color="#333" />
            </TouchableOpacity>
          )}
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: data.avatarUrl || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=200&auto=format&fit=crop' }} style={styles.avatar} />
            <View style={styles.verifiedBadge}>
              <MaterialCommunityIcons name="check-decagram" size={20} color="#00C853" />
            </View>
          </View>
          
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.role}>{data.roleTitle || 'Profissional'}</Text>
          
          <View style={styles.statusContainer}>
            <View style={[styles.statusDot, { backgroundColor: data.isOnline ? '#00C853' : '#9E9E9E' }]} />
            <Text style={[styles.statusText, { color: data.isOnline ? '#00C853' : '#9E9E9E' }]}>
              {data.isOnline ? 'Online agora' : 'Offline'}
            </Text>
            {isOwner && (
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={data.isOnline ? '#2196F3' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={handleToggleStatus}
                value={data.isOnline}
                disabled={isUpdatingStatus}
                style={{ marginLeft: 8, transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
              />
            )}
          </View>
          {data.bio ? (
            <Text style={styles.bio}>{data.bio}</Text>
          ) : null}
          
          <View style={styles.ratingContainer}>
            <MaterialCommunityIcons name="star" size={20} color="#FFB300" />
            <Text style={styles.ratingText}>{data.rating || 0}</Text>
            <Text style={styles.reviewsText}>({data.reviewsCount || 0} avaliações)</Text>
          </View>

          {isOwner ? (
            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity style={[styles.primaryButton, { backgroundColor: '#333' }]} activeOpacity={0.8} onPress={openEditProfile}>
                <View style={styles.primaryButtonContent}>
                  <MaterialCommunityIcons name="account-edit-outline" size={20} color="#FFF" style={styles.btnIcon} />
                  <Text style={styles.primaryButtonText}>Editar Perfil e Destaques</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
                <View style={styles.primaryButtonContent}>
                  <MaterialCommunityIcons name="briefcase-check" size={20} color="#FFF" style={styles.btnIcon} />
                  <Text style={styles.primaryButtonText}>Contratar Agora</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.7}>
                <MaterialCommunityIcons name="message-text-outline" size={20} color="#FF7A00" style={styles.btnIcon} />
                <Text style={styles.secondaryButtonText}>Enviar Mensagem</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Highlights Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Destaques do Profissional</Text>
          
          <View style={styles.highlightsRow}>
            <View style={[styles.highlightCard, { flex: 1, marginRight: 10 }]}>
              <MaterialCommunityIcons name="briefcase-outline" size={28} color="#FF7A00" />
              <Text style={styles.highlightValue}>{data.highlights?.yearsOfExperience || '0'}</Text>
              <Text style={styles.highlightLabel}>ANOS EXPERIÊNCIA</Text>
            </View>
            <View style={[styles.highlightCard, { flex: 1 }]}>
              <MaterialCommunityIcons name="clock-outline" size={28} color="#FF7A00" />
              <Text style={styles.highlightValue}>{data.highlights?.averageResponseTime || '-'}</Text>
              <Text style={styles.highlightLabel}>TEMPO RESPOSTA</Text>
            </View>
          </View>

          <View style={[styles.highlightCard, { marginTop: 10 }]}>
            <MaterialCommunityIcons name="check-circle-outline" size={28} color="#FF7A00" />
            <Text style={styles.highlightValue}>{data.highlights?.completedJobs || '0'}</Text>
            <Text style={styles.highlightLabel}>SERVIÇOS CONCLUÍDOS</Text>
          </View>
        </View>

        {/* Avaliações Section */}
        {reviews && reviews.length > 0 && (
          <View style={styles.section}>
            <View style={styles.portfolioHeader}>
              <Text style={styles.sectionTitle}>Avaliações</Text>
            </View>
            <FlatList
              data={reviews}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={316}
              decelerationRate="fast"
              contentContainerStyle={{ paddingRight: 20 }}
              renderItem={({ item }) => (
                <View style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    {item.reviewer?.picture ? (
                      <Image source={{ uri: item.reviewer.picture }} style={styles.reviewerAvatar} />
                    ) : (
                      <View style={styles.reviewerAvatarPlaceholder}>
                        <Text style={styles.reviewerInitials}>
                          {item.reviewer?.firstName?.charAt(0) || '?'}
                        </Text>
                      </View>
                    )}
                    <View style={styles.reviewerInfo}>
                      <Text style={styles.reviewerName}>
                        {item.reviewer?.firstName} {item.reviewer?.lastName}
                      </Text>
                      <Text style={styles.reviewRating}>
                        {"★".repeat(item.rating)}
                        {"☆".repeat(5 - item.rating)}
                      </Text>
                    </View>
                  </View>
                  {item.comment ? (
                    <Text style={styles.reviewComment} numberOfLines={4}>
                      "{item.comment}"
                    </Text>
                  ) : null}
                </View>
              )}
            />
          </View>
        )}

        {/* Certificates Section */}
        <View style={styles.section}>
          <View style={styles.portfolioHeader}>
            <Text style={styles.sectionTitle}>Certificações</Text>
            {isOwner && (
              <TouchableOpacity onPress={() => setModalCertVisible(true)} activeOpacity={0.6} style={styles.addProjectBtn}>
                <MaterialCommunityIcons name="plus" size={16} color="#FFF" />
                <Text style={styles.addProjectText}>Adicionar</Text>
              </TouchableOpacity>
            )}
          </View>
          
          {data.certificates && data.certificates.length > 0 ? data.certificates.map(cert => (
            <View key={cert.id} style={styles.certificateCard}>
              <View style={[styles.certIconContainer, { backgroundColor: '#EAEAEA' }]}>
                <MaterialCommunityIcons name={(cert.icon as any) || 'medal-outline'} size={24} color="#333" />
              </View>
              <View style={styles.certTextContainer}>
                <Text style={styles.certTitle}>{cert.title}</Text>
                <Text style={styles.certDesc}>{cert.description}</Text>
              </View>
            </View>
          )) : (
            <Text style={{ color: '#888', marginTop: 10 }}>Nenhuma certificação adicionada ainda.</Text>
          )}
        </View>

        {/* Portfolio Section */}
        <View style={styles.section}>
          <View style={styles.portfolioHeader}>
            <Text style={styles.sectionTitle}>Meu Portfólio</Text>
            {isOwner ? (
              <TouchableOpacity onPress={() => setModalVisible(true)} activeOpacity={0.6} style={styles.addProjectBtn}>
                <MaterialCommunityIcons name="plus" size={16} color="#FFF" />
                <Text style={styles.addProjectText}>Adicionar</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity activeOpacity={0.6}>
                <Text style={styles.seeAllText}>Ver todos</Text>
              </TouchableOpacity>
            )}
          </View>

          {data.portfolioItems && data.portfolioItems.length > 0 ? data.portfolioItems.map((item) => (
            <View key={item.id} style={styles.portfolioCard}>
              {item.imageUrl ? (
                <Image source={{ uri: item.imageUrl }} style={styles.portfolioImage} />
              ) : null}
              <View style={styles.portfolioTextContainer}>
                <Text style={styles.portfolioTitle}>{item.title}</Text>
                <Text style={styles.portfolioDesc}>{item.description}</Text>
              </View>
            </View>
          )) : (
            <Text style={{ color: '#888', marginTop: 10 }}>Nenhum projeto no portfólio.</Text>
          )}
        </View>

      </ScrollView>

      {/* Modal for Adding Project */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Novo Projeto</Text>
            
            <Text style={styles.inputLabel}>Título do Projeto</Text>
            <TextInput
              style={[styles.modalInput, projectError && !newProjectTitle ? { borderColor: 'red' } : null]}
              placeholder="Ex: Instalação Elétrica Residencial *"
              value={newProjectTitle}
              onChangeText={setNewProjectTitle}
            />
            
            <Text style={styles.inputLabel}>Descrição</Text>
            <TextInput
              style={[styles.modalInput, { height: 80, textAlignVertical: 'top' }, projectError && !newProjectDesc ? { borderColor: 'red' } : null]}
              placeholder="Descreva brevemente o projeto... *"
              value={newProjectDesc}
              onChangeText={setNewProjectDesc}
              multiline
            />

            {projectError ? <Text style={styles.errorText}>{projectError}</Text> : null}
            
            <TouchableOpacity style={styles.imagePickerBtn}>
              <MaterialCommunityIcons name="image-plus" size={24} color="#666" />
              <Text style={styles.imagePickerText}>Selecionar Foto (Opcional)</Text>
            </TouchableOpacity>

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.modalSaveBtn} onPress={handleAddProject} disabled={addingProject}>
                {addingProject ? (
                  <ActivityIndicator size="small" color="#FFF" />
                ) : (
                  <Text style={styles.modalSaveText}>Salvar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for Adding Certificate */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalCertVisible}
        onRequestClose={() => setModalCertVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nova Certificação</Text>
            
            <Text style={styles.inputLabel}>Nome do Certificado</Text>
            <TextInput
              style={[styles.modalInput, certError && !newCertTitle ? { borderColor: 'red' } : null]}
              placeholder="Ex: NR10 *"
              value={newCertTitle}
              onChangeText={setNewCertTitle}
            />
            
            <Text style={styles.inputLabel}>Instituição / Descrição</Text>
            <TextInput
              style={[styles.modalInput, { height: 80, textAlignVertical: 'top' }, certError && !newCertDesc ? { borderColor: 'red' } : null]}
              placeholder="Quem emitiu ou detalhes do curso... *"
              value={newCertDesc}
              onChangeText={setNewCertDesc}
              multiline
            />

            {certError ? <Text style={styles.errorText}>{certError}</Text> : null}
            
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setModalCertVisible(false)}>
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.modalSaveBtn} onPress={handleAddCertificate} disabled={addingCert}>
                {addingCert ? (
                  <ActivityIndicator size="small" color="#FFF" />
                ) : (
                  <Text style={styles.modalSaveText}>Salvar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal for Editing Profile */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalProfileVisible}
        onRequestClose={() => setModalProfileVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Perfil</Text>
            
            <Text style={styles.inputLabel}>Seu Título Profissional</Text>
            <TextInput
              style={[styles.modalInput, profileError && !editRoleTitle ? { borderColor: 'red' } : null]}
              placeholder="Ex: Eletricista Master *"
              value={editRoleTitle}
              onChangeText={setEditRoleTitle}
            />
            
            <Text style={styles.inputLabel}>Sua Apresentação (Bio)</Text>
            <TextInput
              style={[styles.modalInput, { height: 100, textAlignVertical: 'top' }, profileError && !editBio ? { borderColor: 'red' } : null]}
              placeholder="Fale um pouco sobre sua experiência e serviços... *"
              value={editBio}
              onChangeText={setEditBio}
              multiline
            />

            {profileError ? <Text style={styles.errorText}>{profileError}</Text> : null}

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setModalProfileVisible(false)}>
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.modalSaveBtn} onPress={handleSaveProfile} disabled={savingProfile}>
                {savingProfile ? (
                  <ActivityIndicator size="small" color="#FFF" />
                ) : (
                  <Text style={styles.modalSaveText}>Salvar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FB',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerContainer: {
    height: 220,
    width: '100%',
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  profileCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginTop: -60,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0E6DF',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -60,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFF',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 2,
  },
  name: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A1A',
    marginTop: 12,
  },
  role: {
    fontSize: 16,
    color: '#777',
    fontWeight: '500',
    marginTop: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 24,
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  ratingText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFB300',
    marginLeft: 6,
  },
  reviewsText: {
    fontSize: 14,
    color: '#888',
    marginLeft: 6,
    fontWeight: '500',
  },
  actionButtonsContainer: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: '#FF7A00',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#FF7A00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  primaryButtonContent: {
    flexDirection: 'row',
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnIcon: {
    marginRight: 8,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FF7A00',
  },
  secondaryButtonText: {
    color: '#FF7A00',
    fontSize: 16,
    fontWeight: '700',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  highlightsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  highlightCard: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F0E6DF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  highlightValue: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1A1A1A',
    marginTop: 10,
  },
  highlightLabel: {
    fontSize: 11,
    color: '#888',
    fontWeight: '700',
    marginTop: 6,
    letterSpacing: 0.8,
  },
  certificateCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F0E6DF',
    borderRadius: 16,
    padding: 18,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
  },
  certIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  certTextContainer: {
    flex: 1,
  },
  certTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  certDesc: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  portfolioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    color: '#FF7A00',
    fontSize: 15,
    fontWeight: '700',
  },
  portfolioCard: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F0E6DF',
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  portfolioImage: {
    width: '100%',
    height: 200,
  },
  portfolioTextContainer: {
    padding: 20,
  },
  portfolioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  portfolioDesc: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  editCoverBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 8,
    borderRadius: 20,
  },
  addProjectBtn: {
    flexDirection: 'row',
    backgroundColor: '#FF7A00',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
  },
  addProjectText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 13,
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 6,
    marginLeft: 4,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 16,
    backgroundColor: '#FAFAFA',
  },
  imagePickerBtn: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    backgroundColor: '#FAFAFA',
  },
  imagePickerText: {
    marginLeft: 10,
    color: '#666',
    fontWeight: '600',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  modalCancelBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#CCC',
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: 15,
  },
  modalSaveBtn: {
    flex: 1,
    backgroundColor: '#FF7A00',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  modalSaveText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  bio: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  reviewCard: {
    width: 300,
    marginRight: 16,
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F0E6DF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  reviewerAvatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FF7A00',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reviewerInitials: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  reviewRating: {
    fontSize: 16,
    color: '#F59E0B',
  },
  reviewComment: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    lineHeight: 20,
  }
});
