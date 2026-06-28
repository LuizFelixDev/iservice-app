import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/colors/Colors';
import { getCurrentLocation } from '@/services/location';

interface LocationPickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectLocation: (lat: number, lng: number) => void;
}

export function LocationPickerModal({ visible, onClose, onSelectLocation }: LocationPickerModalProps) {
  const [region, setRegion] = useState<Region | null>(null);
  const [markerCoordinate, setMarkerCoordinate] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (visible) {
      loadInitialLocation();
    }
  }, [visible]);

  const loadInitialLocation = async () => {
    try {
      setLoading(true);
      const { latitude, longitude } = await getCurrentLocation();
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setMarkerCoordinate({ latitude, longitude });
    } catch (error) {
      console.error(error);
      setRegion({
        latitude: -14.235,
        longitude: -51.9253,
        latitudeDelta: 20,
        longitudeDelta: 20,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (markerCoordinate) {
      onSelectLocation(markerCoordinate.latitude, markerCoordinate.longitude);
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="arrow-back" size={24} color={colors.onSurface} />
          </TouchableOpacity>
          <Text style={styles.title}>Escolha o Local</Text>
        </View>

        {loading || !region ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Buscando localização atual...</Text>
          </View>
        ) : (
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={region}
              onPress={(e) => setMarkerCoordinate(e.nativeEvent.coordinate)}
            >
              {markerCoordinate && (
                <Marker
                  coordinate={markerCoordinate}
                  draggable
                  onDragEnd={(e) => setMarkerCoordinate(e.nativeEvent.coordinate)}
                />
              )}
            </MapView>
            
            <View style={styles.footer}>
              <TouchableOpacity 
                style={[styles.confirmBtn, !markerCoordinate && styles.disabledBtn]} 
                onPress={handleConfirm}
                disabled={!markerCoordinate}
              >
                <Text style={styles.confirmText}>Confirmar Localização</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 48,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  closeBtn: {
    marginRight: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.onSurface,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: colors.onSurfaceVariant,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  confirmBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledBtn: {
    opacity: 0.5,
  },
  confirmText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
