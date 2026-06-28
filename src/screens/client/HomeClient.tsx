import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';

import { colors } from '@/colors/Colors';
import { RatingModal, LocationPickerModal } from '@/components';
import { styles } from './HomeClientStyle';

import { usersService } from '@/services/users';
import { jobsService, Job } from '@/services/jobs';
import { reviewsService } from '@/services/reviews';
import { getCurrentLocation } from '@/services/location';

const STATUS_CONFIG = {
  searching: {
    label: 'PROCURANDO PROFISSIONAL',
    color: colors.primary,
  },

  negotiating: {
    label: 'NEGOCIANDO',
    color: '#F59E0B',
  },

  accepted: {
    label: 'PROFISSIONAL A CAMINHO!',
    color: '#16A34A',
  },

  completed: {
    label: 'CONCLUÍDO',
    color: colors.onSurfaceVariant,
  },

  canceled: {
    label: 'CANCELADO',
    color: colors.error,
  },
} as const;

function Header({
  userName,
  onBellPress,
}: {
  userName: string;
  onBellPress: () => void;
}) {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.avatar}>
          <Ionicons
            name="person"
            size={20}
            color={colors.onSurfaceVariant}
          />
        </View>

        <Text style={styles.greeting}>
          Olá, {userName}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.bellBtn}
        onPress={onBellPress}
      >
        <Ionicons
          name="notifications-outline"
          size={22}
          color={colors.onSurface}
        />
      </TouchableOpacity>
    </View>
  );
}

function ServiceRequestCard({
  descricao,
  loading,
  customLocation,
  onChangeDescricao,
  onSolicitar,
  onOpenMap,
}: {
  descricao: string;
  loading: boolean;
  customLocation: { latitude: number; longitude: number } | null;
  onChangeDescricao: (text: string) => void;
  onSolicitar: () => void;
  onOpenMap: () => void;
}) {
  const isDisabled =
    !descricao.trim() || loading;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>
        Do que você precisa agora?
      </Text>

      <Text style={styles.inputLabel}>
        DESCREVA O PROBLEMA
      </Text>

      <TextInput
        style={styles.textInput}
        multiline
        numberOfLines={3}
        value={descricao}
        onChangeText={onChangeDescricao}
        textAlignVertical="top"
        editable={!loading}
        placeholder="Ex: Encanamento vazando..."
        placeholderTextColor={
          colors.onSurfaceVariant
        }
      />

      <TouchableOpacity style={styles.locationRow} onPress={onOpenMap}>
        <Ionicons
          name="location-sharp"
          size={16}
          color={colors.primary}
        />
        <Text style={styles.locationText}>
          {customLocation
            ? 'Localização selecionada no mapa'
            : 'Usar minha localização atual (Automático)'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={isDisabled}
        onPress={onSolicitar}
        style={[
          styles.ctaBtn,
          isDisabled && styles.ctaBtnDisabled,
        ]}
      >
        {loading ? (
          <ActivityIndicator
            color={colors.white}
          />
        ) : (
          <>
            <Text style={styles.ctaBtnText}>
              Solicitar Profissional Próximo
            </Text>

            <Feather
              name="arrow-right"
              size={18}
              color={colors.white}
            />
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}
function ChamadoCard({
  chamado,
  onCancelar,
  onAvaliar,
  isEvaluated,
}: {
  chamado: Job;
  onCancelar: (id: string) => void;
  onAvaliar: (id: string) => void;
  isEvaluated: boolean;
}) {
  const config =
    STATUS_CONFIG[
      chamado.status as keyof typeof STATUS_CONFIG
    ] ?? STATUS_CONFIG.searching;

  const professionalName =
    chamado.professional
      ? `${chamado.professional.firstName} ${chamado.professional.lastName}`
      : 'Aguardando profissional';

  const initials =
    chamado.professional
      ? `${chamado.professional.firstName?.charAt(0) ?? ''}${
          chamado.professional.lastName?.charAt(0) ??
          ''
        }`
      : '?';

  return (
    <View style={styles.chamadoCard}>
      <View style={styles.statusRow}>
        <View
          style={[
            styles.statusDot,
            {
              backgroundColor: config.color,
            },
          ]}
        />

        <Text
          style={[
            styles.statusText,
            {
              color: config.color,
            },
          ]}
        >
          {config.label}
        </Text>
      </View>

      <Text
        style={styles.chamadoTitulo}
        numberOfLines={2}
      >
        {chamado.description}
      </Text>

      <View style={styles.profRow}>
        <View style={styles.profAvatar}>
          {chamado.professional ? (
            <Text
              style={styles.profAvatarText}
            >
              {initials}
            </Text>
          ) : (
            <Ionicons
              name="search"
              size={18}
              color={colors.white}
            />
          )}
        </View>

        <Text style={styles.profNome}>
          {professionalName}
        </Text>

        <TouchableOpacity
          style={styles.chatBtn}
          onPress={() =>
            Alert.alert(
              'Indisponível',
              'Chat ainda não implementado.'
            )
          }
        >
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={20}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      {!['canceled', 'completed'].includes(chamado.status) && (
        <TouchableOpacity
          style={styles.cancelarBtn}
          onPress={() => onCancelar(chamado.id)}
        >
          <Text style={styles.cancelarText}>Cancelar Serviço</Text>
        </TouchableOpacity>
      )}

      {chamado.status === 'completed' && !isEvaluated && (
        <TouchableOpacity
          style={styles.avaliarBtn}
          onPress={() => onAvaliar(chamado.id)}
        >
          <Text style={styles.avaliarText}>Avaliar Profissional</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default function HomeClient() {
  const [descricao, setDescricao] =
    useState('');

  const [userName, setUserName] =
    useState('Usuário');

  const [jobs, setJobs] = useState<Job[]>(
    []
  );

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [creatingJob, setCreatingJob] =
    useState(false);

  const [selectedJobIdForRating, setSelectedJobIdForRating] = 
    useState<string | null>(null);

  const [evaluatedJobs, setEvaluatedJobs] = useState<string[]>([]);
  const [mapModalVisible, setMapModalVisible] = useState(false);
  const [customLocation, setCustomLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const loadData = useCallback(
    async (showLoader = false) => {
      try {
        if (showLoader) {
          setLoading(true);
        }

        const [user, jobsResponse] =
          await Promise.all([
            usersService.getMe(),
            jobsService.getMyJobs(),
          ]);

        setUserName(
          user.firstName || 'Usuário'
        );

        setJobs(jobsResponse);
      } catch {
        Alert.alert(
          'Erro',
          'Não foi possível carregar os dados.'
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    loadData(true);
    reviewsService.getEvaluatedJobs().then(setEvaluatedJobs);
  }, [loadData]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const handleSolicitar =
    async () => {
      if (creatingJob) {
        return;
      }

      const description =
        descricao.trim();

      if (!description) {
        Alert.alert(
          'Descrição obrigatória',
          'Descreva o serviço que você precisa.'
        );
        return;
      }

      try {
        setCreatingJob(true);

        let latitude: number;
        let longitude: number;

        if (customLocation) {
          latitude = customLocation.latitude;
          longitude = customLocation.longitude;
        } else {
          const loc = await getCurrentLocation();
          latitude = loc.latitude;
          longitude = loc.longitude;
        }

        await jobsService.createJob({
          description,
          latitude,
          longitude,
        });

        setDescricao('');
        setCustomLocation(null);

        await loadData();

        Alert.alert(
          'Sucesso',
          'Solicitação enviada com sucesso.'
        );
      } catch (error) {
        console.error(error);

        Alert.alert(
          'Erro',
          error instanceof Error
            ? error.message
            : 'Não foi possível criar o chamado.'
        );
      } finally {
        setCreatingJob(false);
      }
    };

  const handleCancelar = (
    id: string
  ) => {
    Alert.alert(
      'Cancelar serviço',
      'Deseja realmente cancelar este serviço?',
      [
        {
          text: 'Não',
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: async () => {
            try {
              setLoading(true);
              await jobsService.cancelJob(id);
              await loadData();
              Alert.alert('Sucesso', 'Serviço cancelado com sucesso.');
            } catch (error) {
              console.error(error);
              Alert.alert('Erro', 'Não foi possível cancelar o serviço.');
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[
          styles.safe,
          {
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        contentContainerStyle={
          styles.scrollContent
        }
        ListHeaderComponent={
          <>
            <Header
              userName={userName}
              onBellPress={() =>
                Alert.alert(
                  'Indisponível',
                  'Notificações ainda não implementadas.'
                )
              }
            />

            <ServiceRequestCard
              descricao={descricao}
              loading={creatingJob}
              customLocation={customLocation}
              onChangeDescricao={
                setDescricao
              }
              onSolicitar={
                handleSolicitar
              }
              onOpenMap={() => setMapModalVisible(true)}
            />

            <View
              style={
                styles.sectionHeader
              }
            >
              <Text
                style={
                  styles.sectionTitle
                }
              >
                Meus Chamados
              </Text>
            </View>
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <MaterialIcons
              name="assignment"
              size={40}
              color={
                colors.onSurfaceVariant
              }
            />

            <Text
              style={styles.emptyText}
            >
              Nenhum chamado ativo
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <ChamadoCard
            chamado={item}
            onCancelar={
              handleCancelar
            }
            onAvaliar={setSelectedJobIdForRating}
            isEvaluated={evaluatedJobs.includes(item.id)}
          />
        )}
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

      <LocationPickerModal
        visible={mapModalVisible}
        onClose={() => setMapModalVisible(false)}
        onSelectLocation={(lat, lng) => setCustomLocation({ latitude: lat, longitude: lng })}
      />
    </SafeAreaView>
  );
}