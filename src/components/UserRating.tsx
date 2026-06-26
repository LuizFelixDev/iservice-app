import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/colors/Colors';
import { reviewsService } from '@/services/reviews';

interface UserRatingProps {
  userId: string;
}

export function UserRating({ userId }: UserRatingProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchRating = async () => {
      try {
        setLoading(true);
        const data = await reviewsService.getUserReviews(userId);
        if (mounted) {
          setRating(data.averageRating);
          setTotal(data.totalReviews);
        }
      } catch (error) {
        console.error('Failed to load user reviews', error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (userId) {
      fetchRating();
    } else {
      setLoading(false);
    }
    
    return () => {
      mounted = false;
    };
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }

  if (rating === null || total === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.textEmpty}>Sem avaliações</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Ionicons name="star" size={14} color="#F59E0B" />
      <Text style={styles.textRating}>{rating.toFixed(1)}</Text>
      <Text style={styles.textTotal}>({total})</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    minHeight: 20,
  },
  textRating: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
  },
  textTotal: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  textEmpty: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
    fontStyle: 'italic',
  },
});
