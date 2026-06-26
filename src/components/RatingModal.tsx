import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/colors/Colors';
import { reviewsService } from '@/services/reviews';
import { Spacer } from './layout/Spacer';
import { Typography } from './Typography';

interface RatingModalProps {
  visible: boolean;
  jobId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function RatingModal({ visible, jobId, onClose, onSuccess }: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      Alert.alert('Avaliação obrigatória', 'Por favor, selecione uma nota de 1 a 5.');
      return;
    }

    try {
      setLoading(true);
      await reviewsService.createReview(jobId, rating, comment);
      Alert.alert('Sucesso', 'Sua avaliação foi enviada!');
      onSuccess();
    } catch (error: any) {
      console.error(error);
      if (error?.response?.status === 409) {
        Alert.alert('Aviso', 'Você já avaliou este serviço.');
        onSuccess();
      } else {
        Alert.alert('Erro', 'Não foi possível enviar sua avaliação.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setRating(0);
      setComment('');
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={handleClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.closeBtn} onPress={handleClose} disabled={loading}>
            <Ionicons name="close" size={24} color={colors.onSurfaceVariant} />
          </TouchableOpacity>

          <Typography variant="h3" color={colors.onSurface} style={styles.title}>Avaliar Serviço</Typography>
          <Spacer size={8} />
          <Typography variant="body" color={colors.onSurfaceVariant} style={styles.subtitle}>Como foi a sua experiência?</Typography>
          <Spacer size={24} />

          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)} disabled={loading}>
                <Ionicons
                  name={star <= rating ? 'star' : 'star-outline'}
                  size={40}
                  color={star <= rating ? '#F59E0B' : colors.onSurfaceVariant}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Spacer size={24} />

          <TextInput
            style={styles.input}
            placeholder="Deixe um comentário (opcional)..."
            placeholderTextColor={colors.onSurfaceVariant}
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
            editable={!loading}
          />
          <Spacer size={24} />

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} disabled={loading || rating === 0}>
            {loading ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.submitBtnText}>Enviar Avaliação</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    elevation: 5,
    shadowColor: colors.Dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  closeBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
  },
  title: {
    textAlign: 'center',
    fontWeight: '700',
  },
  subtitle: {
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  input: {
    width: '100%',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
    fontSize: 15,
    color: colors.onSurface,
  },
  submitBtn: {
    backgroundColor: colors.primary,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitBtnText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
});
