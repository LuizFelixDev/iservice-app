import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';

import { colors } from '@/colors/Colors';
import { styles } from './HomeClientStyle';

import { usersService } from '@/services/users';
import { jobsService, Job } from '@/services/jobs';

// ── Tipos ────────────────────────────────────────────────────────

interface Chamado {
  id: string;
  status:
    | 'searching'
    | 'negotiating'
    | 'accepted'
    | 'completed'
    | 'canceled';

  description: string;

  professional?: {
    id: string;
    firstName: string;
    lastName: string;
  } | null;
}

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
};

// ── Sub-componentes ──────────────────────────────────────────────

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
        activeOpacity={0.7}
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
  onChangeDescricao,
  onSolicitar,
}: {
  descricao: string;
  onChangeDescricao: (text: string) => void;
  onSolicitar: () => void;
}) {
  const isDisabled = !descricao.trim();

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
        placeholder={
          'Ex: Encanamento vazando, bateria\ndo carro arriada, etc.'
        }
        placeholderTextColor={colors.onSurfaceVariant}
        value={descricao}
        onChangeText={onChangeDescricao}
        textAlignVertical="top"
      />

      <View style={styles.locationRow}>
        <Ionicons
          name="location-sharp"
          size={16}
          color={colors.primary}
        />
        <Text style={styles.locationText}>
          Localização será enviada na solicitação
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.ctaBtn,
          isDisabled && styles.ctaBtnDisabled,
        ]}
        onPress={onSolicitar}
        activeOpacity={0.85}
        disabled={isDisabled}
      >
        <Text style={styles.ctaBtnText}>
          Solicitar Profissional Próximo
        </Text>

        <Feather
          name="arrow-right"
          size={18}
          color={colors.white}
        />
      </TouchableOpacity>
    </View>
  );
}

function ChamadoCard({
  chamado,
  onCancelar,
}: {
  chamado: Chamado;
  onCancelar: (id: string) => void;
}) {
  const config = STATUS_CONFIG[chamado.status];

  const professionalName = chamado.professional
    ? `${chamado.professional.firstName} ${chamado.professional.lastName}`
    : 'Aguardando profissional';

  const initials = chamado.professional
    ? `${chamado.professional.firstName?.[0] ?? ''}${
        chamado.professional.lastName?.[0] ?? ''
      }`
    : '--';

  return (
    <View style={styles.chamadoCard}>
      <View style={styles.statusRow}>
        <View
          style={[
            styles.statusDot,
            { backgroundColor: config.color },
          ]}
        />

        <Text
          style={[
            styles.statusText,
            { color: config.color },
          ]}
        >
          {config.label}
        </Text>

        <TouchableOpacity
          style={styles.editBtn}
          activeOpacity={0.7}
          onPress={() =>
            Alert.alert(
              'Indisponível',
              'Edição ainda não implementada.'
            )
          }
        >
          <Feather
            name="edit-2"
            size={16}
            color={colors.onSurfaceVariant}
          />
        </TouchableOpacity>
      </View>

      <Text
        style={styles.chamadoTitulo}
        numberOfLines={2}
      >
        {chamado.description}
      </Text>

      <View style={styles.profRow}>
        <View style={styles.profAvatar}>
          <Text style={styles.profAvatarText}>
            {initials}
          </Text>
        </View>

        <Text style={styles.profNome}>
          {professionalName}
        </Text>

        <TouchableOpacity
          style={styles.chatBtn}
          activeOpacity={0.7}
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

      <TouchableOpacity
        style={styles.cancelarBtn}
        onPress={() => onCancelar(chamado.id)}
        activeOpacity={0.8}
      >
        <Text style={styles.cancelarText}>
          Cancelar Serviço
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// ── Tela principal ───────────────────────────────────────────────

export default function HomeClient() {
  const [descricao, setDescricao] = useState('');
  const [userName, setUserName] = useState('Usuário');
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [user, jobsResponse] =
        await Promise.all([
          usersService.getMe(),
          jobsService.getMyJobs(),
        ]);

      setUserName(user.firstName || 'Usuário');
      setJobs(jobsResponse);
    } catch {
      Alert.alert(
        'Erro',
        'Não foi possível carregar os dados.'
      );
    }
  };

  const handleSolicitar = async () => {
    if (!descricao.trim()) {
      return;
    }

    try {
      await jobsService.createJob({
        description: descricao,
        latitude: 0,
        longitude: 0,
      });

      setDescricao('');

      await loadData();

      Alert.alert(
        'Sucesso',
        'Solicitação enviada com sucesso.'
      );
    } catch {
      Alert.alert(
        'Erro',
        'Não foi possível criar o chamado.'
      );
    }
  };

  const handleCancelar = (id: string) => {
    Alert.alert(
      'Indisponível',
      `O cancelamento do chamado ainda não foi implementado.`
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
          onChangeDescricao={setDescricao}
          onSolicitar={handleSolicitar}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Meus Chamados
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              Alert.alert(
                'Indisponível',
                'Tela de listagem completa ainda não implementada.'
              )
            }
          >
            <Text style={styles.verTodos}>
              Ver todos
            </Text>
          </TouchableOpacity>
        </View>

        {jobs.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialIcons
              name="assignment"
              size={40}
              color={colors.onSurfaceVariant}
            />

            <Text style={styles.emptyText}>
              Nenhum chamado ativo
            </Text>
          </View>
        ) : (
          jobs.map((job) => (
            <ChamadoCard
              key={job.id}
              chamado={job}
              onCancelar={handleCancelar}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}