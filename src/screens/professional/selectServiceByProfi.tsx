import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = {
  id: string;
  label: string;
  icon: string;
};

type Professional = {
  id: string;
  name: string;
  role: string;
  categoryId: string;
  avatar: string;
  coverImage: string;
  rating: number;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES: Category[] = [
  { id: 'encanador', label: 'Encanador', icon: '🔧' },
  { id: 'eletricista', label: 'Eletricista', icon: '⚡' },
  { id: 'limpeza', label: 'Limpeza', icon: '🧹' },
  { id: 'jardinagem', label: 'Jardinagem', icon: '🌿' },
  { id: 'reformas', label: 'Reformas', icon: '🏠' },
];

const PROFESSIONALS: Professional[] = [
  {
    id: '1',
    name: 'Ana Oliveira',
    role: 'Limpeza',
    categoryId: 'limpeza',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    coverImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    rating: 4.9,
  },
  {
    id: '2',
    name: 'Marcos Souza',
    role: 'Eletricista',
    categoryId: 'eletricista',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    coverImage: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80',
    rating: 4.7,
  },
  {
    id: '3',
    name: 'Pedro Santos',
    role: 'Encanador',
    categoryId: 'encanador',
    avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    coverImage: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
    rating: 4.8,
  },
  {
    id: '4',
    name: 'Carla Lima',
    role: 'Jardinagem',
    categoryId: 'jardinagem',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    coverImage: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
    rating: 4.6,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const CategoryPill = ({
  item,
  selected,
  onPress,
}: {
  item: Category;
  selected: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={[styles.pill, selected && styles.pillSelected]}
    onPress={onPress}
    activeOpacity={0.75}
  >
    <Text style={styles.pillIcon}>{item.icon}</Text>
    <Text style={[styles.pillLabel, selected && styles.pillLabelSelected]}>
      {item.label}
    </Text>
  </TouchableOpacity>
);

const ProfessionalCard = ({
  item,
  onPress,
}: {
  item: Professional;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
    <Image
      source={{ uri: item.coverImage }}
      style={styles.cardCover}
      resizeMode="cover"
    />
    {/* dark gradient overlay */}
    <View style={styles.cardOverlay} />

    {/* bottom info row */}
    <View style={styles.cardInfo}>
      <View style={styles.cardText}>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardRole}>{item.role}</Text>
      </View>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
    </View>
  </TouchableOpacity>
);

// ─── Bottom Tab Bar ────────────────────────────────────────────────────────────

const TAB_ITEMS = [
  { id: 'inicio', label: 'Início', icon: '🏠' },
  { id: 'profissionais', label: 'Profissionais', icon: '👤' },
  { id: 'historico', label: 'Histórico', icon: '🕐' },
  { id: 'perfil', label: 'Perfil', icon: '👤' },
];


// ─── Main Screen ──────────────────────────────────────────────────────────────

export default function SelectServiceByProfi() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('profissionais');

  const filtered = selectedCategory
    ? PROFESSIONALS.filter((p) => p.categoryId === selectedCategory)
    : PROFESSIONALS;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F7F4" />

      {/* ── Header ── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Profissionais</Text>
        </View>
        <TouchableOpacity style={styles.bellBtn} activeOpacity={0.8}>
          <Text style={styles.bellIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* ── Category Pills ── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pillsRow}
      >
        {CATEGORIES.map((cat) => (
          <CategoryPill
            key={cat.id}
            item={cat}
            selected={selectedCategory === cat.id}
            onPress={() =>
              setSelectedCategory(selectedCategory === cat.id ? null : cat.id)
            }
          />
        ))}
      </ScrollView>

      {/* ── Professional List ── */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProfessionalCard item={item} onPress={() => {}} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Nenhum profissional encontrado.</Text>
          </View>
        }
      />

    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const ORANGE = '#F97316';
const DARK = '#1A1A2E';
const CARD_RADIUS = 16;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8F7F4',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
    backgroundColor: '#F8F7F4',
  },
  headerGreeting: {
    fontSize: 13,
    color: '#888',
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  headerTitle: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: '800',
    color: DARK,
    letterSpacing: -0.5,
  },
  bellBtn: {
    marginTop:30,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  bellIcon: {
    fontSize: 18,
  },

  // Category pills
  pillsRow: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
    marginRight: 6,
  },
  pillSelected: {
    backgroundColor: ORANGE,
    borderColor: ORANGE,
  },
  pillIcon: {
    fontSize: 15,
  },
  pillLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
  },
  pillLabelSelected: {
    color: '#FFF',
  },

  // List
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 16,
    gap: 14,
  },

  // Card
  card: {
    width: '100%',
    height: 160,
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
    backgroundColor: '#DDD',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 2,
  },
  cardCover: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.38)',
    // stronger at the bottom
    borderRadius: CARD_RADIUS,
  },
  cardInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  cardText: {
    flex: 1,
  },
  cardName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: -0.3,
  },
  cardRole: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
    marginTop: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2.5,
    borderColor: '#FFF',
    backgroundColor: '#CCC',
  },

  // Empty state
  emptyState: {
    paddingTop: 60,
    alignItems: 'center',
  },
  emptyText: {
    color: '#AAA',
    fontSize: 15,
  },

  // Bottom Tab Bar
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingBottom: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 2,
  },
  tabIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  tabLabel: {
    fontSize: 10,
    color: '#AAA',
    fontWeight: '500',
  },
  tabLabelActive: {
    color: ORANGE,
    fontWeight: '700',
  },
  tabIndicator: {
    position: 'absolute',
    top: -8,
    width: 24,
    height: 3,
    borderRadius: 2,
    backgroundColor: ORANGE,
  },
});