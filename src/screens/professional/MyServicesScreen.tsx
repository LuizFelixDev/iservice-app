import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import { colors } from '@/colors/Colors';
import { jobsService, Job } from '@/services/jobs';
import { reviewsService } from '@/services/reviews';
import { RatingModal } from '@/components';
import { styles } from './MyServicesStyle';

const STATUS_CONFIG = {
  searching: { label: 'BUSCANDO PROFISSIONAL', color: colors.primary },
  negotiating: { label: 'NEGOCIANDO', color: '#F59E0B' },
  accepted: { label: 'EM ANDAMENTO', color: '#16A34A' },
  completed: { label: 'CONCLUÍDO', color: colors.onSurfaceVariant },
  canceled: { label: 'CANCELADO', color: colors.error },
} as const;

export default function MyServicesScreen() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [selectedJobIdForRating, setSelectedJobIdForRating] = useState<string | null>(null);
  const [evaluatedJobs, setEvaluatedJobs] = useState<string[]>([]);

  const loadJobs = useCallback(async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      const data = await jobsService.getMyServices();
      setJobs(data);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar os serviços.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadJobs();
      reviewsService.getEvaluatedJobs().then(setEvaluatedJobs);
    }, [loadJobs])
  );

  const handleComplete = async (id: string) => {
    try {
      setActionLoading(id);
      await jobsService.completeJob(id);
      Alert.alert('Sucesso', 'Serviço marcado como concluído.');
      loadJobs();
      setSelectedJobIdForRating(id);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível concluir o serviço.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancel = (id: string) => {
    Alert.alert(
      'Cancelar Serviço',
      'Você tem certeza que deseja desistir deste serviço?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim, desistir',
          style: 'destructive',
          onPress: async () => {
            try {
              setActionLoading(id);
              await jobsService.cancelJob(id);
              Alert.alert('Sucesso', 'Você cancelou o serviço.');
              loadJobs();
            } catch (error) {
              console.error(error);
              Alert.alert('Erro', 'Não foi possível cancelar o serviço.');
            } finally {
              setActionLoading(null);
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Job }) => {
    const config = STATUS_CONFIG[item.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.searching;
    const isAccepted = item.status === 'accepted';
    const isLoading = actionLoading === item.id;

    return (
      <View style={styles.card}>
        <View style={styles.statusRow}>
          <View style={[styles.statusDot, { backgroundColor: config.color }]} />
          <Text style={[styles.statusText, { color: config.color }]}>{config.label}</Text>
        </View>

        <Text style={styles.description}>{item.description}</Text>

        {isAccepted && (
          <View style={styles.actionRow}>
            <TouchableOpacity 
              style={[styles.btnBase, styles.completeBtn]}
              onPress={() => handleComplete(item.id)}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.white} size="small" />
              ) : (
                <Text style={styles.completeText}>Concluir</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.btnBase, styles.cancelBtn]}
              onPress={() => handleCancel(item.id)}
              disabled={isLoading}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        )}

        {item.status === 'completed' && !evaluatedJobs.includes(item.id) && (
          <View style={styles.actionRow}>
            <TouchableOpacity 
              style={[styles.btnBase, styles.evaluateBtn]}
              onPress={() => setSelectedJobIdForRating(item.id)}
            >
              <Text style={styles.evaluateText}>Avaliar Cliente</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={[styles.safe, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Meus Serviços</Text>
      </View>

      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadJobs(true); }} />}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialIcons name="assignment" size={48} color={colors.onSurfaceVariant} />
            <Text style={styles.emptyText}>Você ainda não possui histórico de serviços.</Text>
          </View>
        }
      />

      {selectedJobIdForRating && (
        <RatingModal
          visible={!!selectedJobIdForRating}
          jobId={selectedJobIdForRating}
          onClose={() => setSelectedJobIdForRating(null)}
          onSuccess={() => {
            if (selectedJobIdForRating) {
              setEvaluatedJobs((prev) => [...prev, selectedJobIdForRating]);
              reviewsService.saveEvaluatedJob(selectedJobIdForRating);
            }
            setSelectedJobIdForRating(null);
          }}
        />
      )}
    </SafeAreaView>
  );
}
