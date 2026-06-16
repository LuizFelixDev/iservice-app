import * as Location from 'expo-location';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export class LocationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LocationError';
  }
}

export async function getCurrentLocation(): Promise<Coordinates> {
  const permission =
    await Location.requestForegroundPermissionsAsync();

  if (!permission.granted) {
    throw new LocationError(
      'Permissão de localização não concedida.'
    );
  }

  const position =
    await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

  const { latitude, longitude } = position.coords;

  if (
    typeof latitude !== 'number' ||
    typeof longitude !== 'number'
  ) {
    throw new LocationError(
      'Não foi possível obter coordenadas válidas.'
    );
  }

  return {
    latitude,
    longitude,
  };
}