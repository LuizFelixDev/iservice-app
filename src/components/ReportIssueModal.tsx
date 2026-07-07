import React, { useState } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Typography, Button } from '.';
import { colors } from '@/colors/Colors';
import api from '@/services/api';

interface ReportIssueModalProps {
  visible: boolean;
  onClose: () => void;
}

export function ReportIssueModal({ visible, onClose }: ReportIssueModalProps) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) {
      Alert.alert('Erro', 'Por favor, descreva o problema.');
      return;
    }

    try {
      setLoading(true);
      await api.post('/feedbacks', { text });
      Alert.alert('Sucesso', 'Seu feedback foi enviado com sucesso. Obrigado!');
      setText('');
      onClose();
    } catch (error) {
      console.error('Erro ao enviar feedback:', error);
      Alert.alert('Erro', 'Não foi possível enviar o feedback. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Typography variant="h3" color="#1A1A1A">Reportar um Erro</Typography>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
              <MaterialCommunityIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          <Typography variant="body" color="#666" style={styles.description}>
            Encontrou algum problema ou tem uma sugestão? Descreva abaixo para que possamos melhorar o app.
          </Typography>

          <TextInput
            style={styles.input}
            placeholder="Descreva o problema detalhadamente..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            value={text}
            onChangeText={setText}
            maxLength={1000}
          />
          <Typography variant="body" style={styles.charCount} color="#999">
            {text.length}/1000
          </Typography>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose} disabled={loading}>
              <Typography variant="body" weight="600" color="#666">Cancelar</Typography>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.submitBtn, (!text.trim() || loading) && styles.submitBtnDisabled]} 
              onPress={handleSubmit}
              disabled={!text.trim() || loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Typography variant="body" weight="700" color="#FFF">Enviar</Typography>
              )}
            </TouchableOpacity>
          </View>
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
    padding: 20,
  },
  container: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  description: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F8F9FB',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 12,
    padding: 16,
    color: '#1A1A1A',
    fontFamily: 'Inter-Regular',
    minHeight: 120,
  },
  charCount: {
    textAlign: 'right',
    marginTop: 8,
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 24,
  },
  cancelBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnDisabled: {
    backgroundColor: '#CCC',
  },
});
