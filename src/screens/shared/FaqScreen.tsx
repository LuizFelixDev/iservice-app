import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  View,
} from 'react-native';

import { Screen, Spacer, Typography } from '@/components';
import { colors } from '@/colors/Colors';
import { helpService, FaqItem } from '@/services/help';

export default function FaqScreen() {
  const [faq, setFaq] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFaq();
  }, []);

  const loadFaq = async () => {
    try {
      const data = await helpService.getFaq();
      setFaq(data);
    } catch {
      Alert.alert(
        'Erro',
        'Não foi possível carregar as perguntas frequentes.',
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Screen backgroundColor={colors.background}>
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />
      </Screen>
    );
  }

  return (
    <Screen scrollable backgroundColor={colors.background}>
      <Spacer size={40} />

      <Typography
        variant="h1"
        color={colors.primary}
      >
        Perguntas Frequentes
      </Typography>

      <Spacer size={24} />

      {faq.map((item) => (
        <View
          key={item.id}
          style={styles.card}
        >
          <Typography
            variant="label"
            weight="700"
          >
            {item.question}
          </Typography>

          <Spacer size={8} />

          <Typography variant="body">
            {item.answer}
          </Typography>
        </View>
      ))}

      <Spacer size={40} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
});