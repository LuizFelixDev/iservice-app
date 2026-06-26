import React, { useState, useCallback } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Alert, Text, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { colors } from '@/colors/Colors';
import { jobsService, Job } from '@/services/jobs';
import { usersService } from '@/services/users';
import { getCurrentLocation } from '@/services/location';
import { Typography, Spacer } from '@/components';

export default function RadarScreen() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const navigation = useNavigation<any>();

  const loadRadarJobs = useCallback(async (isRefresh = false) => {
    try {
      if (!isRefresh) setLoading(true);
      const { latitude, longitude } = await getCurrentLocation();
      const [data, me] = await Promise.all([
        jobsService.getRadarJobs(latitude, longitude, 15000), // 15km
        usersService.getMe()
      ]);
      setJobs(data.filter((job) => job.client?.id !== me.id));
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível buscar serviços próximos. Verifique sua localização.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadRadarJobs();
    }, [loadRadarJobs])
  );

  const handleAcceptJob = async (id: string) => {
    try {
      setActionLoading(id);
      await jobsService.acceptJob(id);
      Alert.alert('Sucesso', 'Você aceitou o serviço!');
      // Navigate to MyServices so the user can see their accepted job
      navigation.navigate('Serviços');
    } catch (error: any) {
      console.error(error);
      if (error?.response?.status === 409) {
        Alert.alert('Ops', 'Outro profissional já aceitou este serviço.');
        loadRadarJobs();
      } else {
        Alert.alert('Erro', 'Não foi possível aceitar o serviço.');
      }
    } finally {
      setActionLoading(null);
    }
  };

  const renderItem = ({ item }: { item: Job }) => {
    const isLoading = actionLoading === item.id;
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="location" size={20} color={colors.primary} />
          <Text style={styles.cardTitle}>Serviço Próximo</Text>
        </View>
        <Text style={styles.description}>{item.description}</Text>
        <TouchableOpacity
          style={styles.acceptBtn}
          onPress={() => handleAcceptJob(item.id)}
          disabled={isLoading || actionLoading !== null}
        >
          {isLoading ? (
            <ActivityIndicator color={colors.white} size="small" />
          ) : (
            <Text style={styles.acceptBtnText}>Aceitar Serviço</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Typography variant="h1" color={colors.onSurface}>Radar</Typography>
        <Typography variant="body" color={colors.onSurfaceVariant}>Buscando serviços próximos a você</Typography>
      </View>

      {loading && !refreshing ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Spacer size={16} />
          <Typography variant="body" color={colors.onSurfaceVariant}>Buscando sua localização...</Typography>
        </View>
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); loadRadarJobs(true); }} />}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <MaterialIcons name="radar" size={60} color={colors.onSurfaceVariant} />
              <Spacer size={12} />
              <Typography variant="body" color={colors.onSurfaceVariant}>Nenhum serviço encontrado na sua região agora.</Typography>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: colors.Dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
  },
  description: {
    fontSize: 16,
    color: colors.onSurface,
    fontWeight: '600',
    marginBottom: 16,
  },
  acceptBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  acceptBtnText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 80,
  },
});