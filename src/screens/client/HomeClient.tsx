import React, { useState } from 'react';
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

// ── Tipos ────────────────────────────────────────────────────────

interface Chamado {
  id: string;
  status: 'a_caminho' | 'aguardando' | 'concluido';
  titulo: string;
  profissional: { iniciais: string; nome: string };
}

// ── Dados mockados ───────────────────────────────────────────────

const MOCK_CHAMADOS: Chamado[] = [
  {
    id: '1',
    status: 'a_caminho',
    titulo: 'Vazamento na pia da cozinha',
    profissional: { iniciais: 'JS', nome: 'João Silva' },
  },
];

const STATUS_CONFIG: Record<Chamado['status'], { label: string; color: string }> = {
  a_caminho: { label: 'PROFISSIONAL A CAMINHO!', color: '#16A34A' },
  aguardando: { label: 'AGUARDANDO PROFISSIONAL', color: colors.primary },
  concluido:  { label: 'CONCLUÍDO',               color: colors.onSurfaceVariant },
};

// ── Sub-componentes ──────────────────────────────────────────────

function Header({ userName, onBellPress }: { userName: string; onBellPress: () => void }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={20} color={colors.onSurfaceVariant} />
        </View>
        <Text style={styles.greeting}>Olá, {userName}</Text>
      </View>
      <TouchableOpacity style={styles.bellBtn} onPress={onBellPress} activeOpacity={0.7}>
        <Ionicons name="notifications-outline" size={22} color={colors.onSurface} />
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
      <Text style={styles.cardTitle}>Do que você precisa agora?</Text>

      <Text style={styles.inputLabel}>DESCRIÇÃO DO PROBLEMA</Text>
      <TextInput
        style={styles.textInput}
        multiline
        numberOfLines={3}
        placeholder={'Descreva o problema... Ex:\nEncanamento vazando, bateria\ndo carro arriada, etc.'}
        placeholderTextColor={colors.onSurfaceVariant}
        value={descricao}
        onChangeText={onChangeDescricao}
        textAlignVertical="top"
      />

      <View style={styles.locationRow}>
        <Ionicons name="location-sharp" size={16} color={colors.primary} />
        <Text style={styles.locationText}>Localização capturada com sucesso</Text>
      </View>

      <TouchableOpacity
        style={[styles.ctaBtn, isDisabled && styles.ctaBtnDisabled]}
        onPress={onSolicitar}
        activeOpacity={0.85}
        disabled={isDisabled}
      >
        <Text style={styles.ctaBtnText}>Solicitar Profissional Próximo</Text>
        <Feather name="arrow-right" size={18} color={colors.white} />
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
  const { label, color } = STATUS_CONFIG[chamado.status];

  return (
    <View style={styles.chamadoCard}>
      <View style={styles.statusRow}>
        <View style={[styles.statusDot, { backgroundColor: color }]} />
        <Text style={[styles.statusText, { color }]}>{label}</Text>
        <TouchableOpacity style={styles.editBtn} activeOpacity={0.7}>
          <Feather name="edit-2" size={16} color={colors.onSurfaceVariant} />
        </TouchableOpacity>
      </View>

      <Text style={styles.chamadoTitulo}>{chamado.titulo}</Text>

      <View style={styles.profRow}>
        <View style={styles.profAvatar}>
          <Text style={styles.profAvatarText}>{chamado.profissional.iniciais}</Text>
        </View>
        <Text style={styles.profNome}>{chamado.profissional.nome}</Text>
        <TouchableOpacity style={styles.chatBtn} activeOpacity={0.7}>
          <Ionicons name="chatbubble-ellipses-outline" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.cancelarBtn}
        onPress={() => onCancelar(chamado.id)}
        activeOpacity={0.8}
      >
        <Text style={styles.cancelarText}>Cancelar Serviço</Text>
      </TouchableOpacity>
    </View>
  );
}

// ── Tela principal ───────────────────────────────────────────────

export default function HomeClient() {
  const [descricao, setDescricao] = useState('');

  const handleSolicitar = () => {
    if (!descricao.trim()) return;
    Alert.alert('Solicitando profissional para: ' + descricao);
  };

  const handleCancelar = (id: string) => {
    Alert.alert('Chamado ' + id + ' cancelado');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Header userName="Usuário" onBellPress={() => {}} />

        <ServiceRequestCard
          descricao={descricao}
          onChangeDescricao={setDescricao}
          onSolicitar={handleSolicitar}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Meus Chamados</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.verTodos}>Ver todos</Text>
          </TouchableOpacity>
        </View>

        {MOCK_CHAMADOS.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialIcons name="assignment" size={40} color={colors.onSurfaceVariant} />
            <Text style={styles.emptyText}>Nenhum chamado ativo</Text>
          </View>
        ) : (
          MOCK_CHAMADOS.map((c) => (
            <ChamadoCard key={c.id} chamado={c} onCancelar={handleCancelar} />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}