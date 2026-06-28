import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PROFI_DATA = {
  name: 'Alex Silva',
  role: 'Eletricista Master',
  rating: 4.9,
  reviewsCount: '120+',
  avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?q=80&w=200&auto=format&fit=crop',
  coverImage: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=1000&auto=format&fit=crop',
  portfolio: [
    {
      id: '1',
      title: 'Instalação Painel Elétrico',
      description: 'Residência alto padrão, modernização completa do quadro de distribuição.',
      imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: '2',
      title: 'Projeto Iluminação',
      description: 'Instalação de trilhos e pendentes em escritório corporativo.',
      imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: '3',
      title: 'Manutenção Industrial',
      description: 'Revisão preventiva em maquinário de grande porte.',
      imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=600&auto=format&fit=crop'
    },
    {
      id: '4',
      title: 'Automação Residencial',
      description: 'Integração de sistemas de iluminação e segurança.',
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=600&auto=format&fit=crop'
    }
  ],
};

export default function ProfessionalPortfolio() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.headerContainer}>
          <Image source={{ uri: PROFI_DATA.coverImage }} style={styles.coverImage} />
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: PROFI_DATA.avatar }} style={styles.avatar} />
            <View style={styles.verifiedBadge}>
              <MaterialCommunityIcons name="check-decagram" size={20} color="#FF7A00" />
            </View>
          </View>
          
          <Text style={styles.name}>{PROFI_DATA.name}</Text>
          <Text style={styles.role}>{PROFI_DATA.role}</Text>
          
          <View style={styles.ratingContainer}>
            <MaterialCommunityIcons name="star" size={18} color="#FF7A00" />
            <Text style={styles.ratingText}>{PROFI_DATA.rating}</Text>
            <Text style={styles.reviewsText}>({PROFI_DATA.reviewsCount} serviços)</Text>
          </View>

          <View style={styles.actionButtonsContainer}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Contratar Agora</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Enviar Mensagem</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Highlights</Text>
          
          <View style={styles.highlightsRow}>
            <View style={[styles.highlightCard, { flex: 1, marginRight: 10 }]}>
              <MaterialCommunityIcons name="briefcase-outline" size={28} color="#FF7A00" />
              <Text style={styles.highlightValue}>15+</Text>
              <Text style={styles.highlightLabel}>ANOS EXPERIÊNCIA</Text>
            </View>
            <View style={[styles.highlightCard, { flex: 1 }]}>
              <MaterialCommunityIcons name="clock-outline" size={28} color="#FF7A00" />
              <Text style={styles.highlightValue}>&lt; 1h</Text>
              <Text style={styles.highlightLabel}>TEMPO RESPOSTA</Text>
            </View>
          </View>

          <View style={[styles.highlightCard, { marginTop: 10 }]}>
            <MaterialCommunityIcons name="check-circle-outline" size={28} color="#FF7A00" />
            <Text style={styles.highlightValue}>300+</Text>
            <Text style={styles.highlightLabel}>SERVIÇOS CONCLUÍDOS</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certificates</Text>
          
          <View style={styles.certificateCard}>
            <View style={[styles.certIconContainer, { backgroundColor: '#FFEADD' }]}>
              <MaterialCommunityIcons name="lightning-bolt" size={24} color="#333" />
            </View>
            <View style={styles.certTextContainer}>
              <Text style={styles.certTitle}>NR10 Certification</Text>
              <Text style={styles.certDesc}>Segurança em Instalações</Text>
            </View>
          </View>

          <View style={styles.certificateCard}>
            <View style={[styles.certIconContainer, { backgroundColor: '#EAEAEA' }]}>
              <MaterialCommunityIcons name="medal-outline" size={24} color="#333" />
            </View>
            <View style={styles.certTextContainer}>
              <Text style={styles.certTitle}>Top Pro 2023</Text>
              <Text style={styles.certDesc}>Awarded for Excellence</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.portfolioHeader}>
            <Text style={styles.sectionTitle}>Meu Portfólio</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>

          {PROFI_DATA.portfolio.map((item) => (
            <View key={item.id} style={styles.portfolioCard}>
              <Image source={{ uri: item.imageUrl }} style={styles.portfolioImage} />
              <View style={styles.portfolioTextContainer}>
                <Text style={styles.portfolioTitle}>{item.title}</Text>
                <Text style={styles.portfolioDesc}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerContainer: {
    height: 180,
    width: '100%',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  profileCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginTop: -40,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0E6DF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -50,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#FFF',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: '#FFF',
    borderRadius: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginTop: 12,
  },
  role: {
    fontSize: 15,
    color: '#666',
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  ratingText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FF7A00',
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 14,
    color: '#888',
    marginLeft: 4,
  },
  actionButtonsContainer: {
    width: '100%',
    gap: 10,
  },
  primaryButton: {
    backgroundColor: '#FF7A00',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#FFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF7A00',
  },
  secondaryButtonText: {
    color: '#FF7A00',
    fontSize: 15,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 15,
  },
  highlightsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  highlightCard: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F0E6DF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  highlightValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginTop: 8,
  },
  highlightLabel: {
    fontSize: 11,
    color: '#666',
    fontWeight: '600',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  certificateCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F0E6DF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 10,
  },
  certIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  certTextContainer: {
    flex: 1,
  },
  certTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  certDesc: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  portfolioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  seeAllText: {
    color: '#FF7A00',
    fontSize: 14,
    fontWeight: '600',
  },
  portfolioCard: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F0E6DF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  portfolioImage: {
    width: '100%',
    height: 180,
  },
  portfolioTextContainer: {
    padding: 16,
  },
  portfolioTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  portfolioDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  }
});