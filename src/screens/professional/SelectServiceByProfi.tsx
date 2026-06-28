import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  FlatList,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../colors/Colors';
import { styles } from './SelectServiceByProfiStyle';

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

const CATEGORIES: Category[] = [
  { id: 'encanador',   label: 'Encanador',   icon: 'pipe-wrench'    },
  { id: 'eletricista', label: 'Eletricista', icon: 'lightning-bolt' },
  { id: 'limpeza',     label: 'Limpeza',     icon: 'broom'          },
  { id: 'jardinagem',  label: 'Jardinagem',  icon: 'flower'         },
  { id: 'reformas',    label: 'Reformas',    icon: 'home-edit'      },
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
    <MaterialCommunityIcons
      name={item.icon as any}
      size={15}
      color={selected ? colors.white : colors.onSurfaceVariant}
      style={styles.pillIcon}
    />
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
    <View style={styles.cardOverlay} />
    <View style={styles.cardInfo}>
      <View style={styles.cardText}>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardRole}>{item.role}</Text>
      </View>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
    </View>
  </TouchableOpacity>
);

export default function SelectServiceByProfi() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filtered = selectedCategory
    ? PROFESSIONALS.filter((p) => p.categoryId === selectedCategory)
    : PROFESSIONALS;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profissionais</Text>
        <TouchableOpacity style={styles.bellBtn} activeOpacity={0.8}>
          <Ionicons name="notifications-outline" size={20} color={colors.onSurface} />
        </TouchableOpacity>
      </View>

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