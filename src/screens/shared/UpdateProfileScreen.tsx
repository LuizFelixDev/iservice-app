import React, { useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useForm} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

import { Screen, Typography, Button, ControlledInput, Spacer } from '@/components';
import { colors } from '@/colors/Colors';
import { usersService, UpdateProfileDto } from '@/services/users';
import { useAuth } from '@/contexts/AuthContext';
import { maskDocument, maskPhone } from '@/utils/masks';

const updateProfileSchema = z.object({
  bio: z.string().min(10, 'A bio deve ter pelo menos 10 caracteres'),
  phoneNumber: z.string().min(14, 'Telefone inválido'),
  document: z.string().min(14, 'Documento inválido'),
});

type UpdateProfileData = z.infer<typeof updateProfileSchema>;

export default function UpdateProfileScreen() {
  const navigation = useNavigation();
  const { updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [locationCoords, setLocationCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [gettingLocation, setGettingLocation] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
  });

  const handleGetLocation = async () => {
    setGettingLocation(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão Negada', 'Precisamos da localização para te cadastrar como profissional.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocationCoords({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      Alert.alert('Sucesso', 'Localização capturada com sucesso!');
    } catch {
      Alert.alert('Erro', 'Não foi possível capturar a localização.');
    } finally {
      setGettingLocation(false);
    }
  };

  const onSubmit = async (data: UpdateProfileData) => {
    if (!locationCoords) {
      Alert.alert('Atenção', 'Por favor, capture sua localização para continuar.');
      return;
    }

    setLoading(true);
    try {
      const payload: UpdateProfileDto = {
        ...data,
        latitude: locationCoords.lat,
        longitude: locationCoords.lng,
      };

      const updatedUser = await usersService.updateProfile(payload);
      
      updateUser(updatedUser);
      
      Alert.alert('Sucesso', 'Seu perfil foi atualizado e agora você é um Profissional!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch {
      Alert.alert('Erro', 'Falha ao atualizar o perfil. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen scrollable backgroundColor={colors.background}>
      <Spacer size={40} />
      
      <Typography variant="h1" color={colors.primary}>Tornar-se Profissional</Typography>
      <Spacer size={8} />
      <Typography variant="body" color={colors.onSurfaceVariant}>
        Preencha os dados abaixo para ativar sua conta de profissional e aparecer no radar.
      </Typography>
      
      <Spacer size={32} />

      <ControlledInput
        control={control}
        name="bio"
        label="Sua Biografia"
        placeholder="Fale um pouco sobre seus serviços..."
        error={errors.bio?.message}
      />

      <Spacer size={16} />

      <ControlledInput
        control={control}
        name="phoneNumber"
        label="Telefone (WhatsApp)"
        placeholder="(11) 99999-9999"
        error={errors.phoneNumber?.message}
        keyboardType="phone-pad"
        mask={maskPhone}
      />

      <Spacer size={16} />

      <ControlledInput
        control={control}
        name="document"
        label="CPF ou CNPJ"
        placeholder="000.000.000-00"
        error={errors.document?.message}
        keyboardType="numeric"
        mask={maskDocument}
      />

      <Spacer size={24} />

      <View style={styles.locationContainer}>
        <Typography variant="label" weight="600" color={colors.onSurface}>Localização de Atuação</Typography>
        <Spacer size={8} />
        {locationCoords ? (
          <Typography variant="body" color={colors.primary}>
            📍 Localização capturada!
          </Typography>
        ) : (
          <Button 
            title={gettingLocation ? "Capturando..." : "Capturar Minha Localização"} 
            variant="outline" 
            onPress={handleGetLocation} 
            disabled={gettingLocation}
          />
        )}
      </View>

      <Spacer size={40} />

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <Button 
          title="Salvar e Ativar Perfil" 
          onPress={handleSubmit(onSubmit)} 
        />
      )}

      <Spacer size={40} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  locationContainer: {
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  }
});
