import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import { useAuth } from '@/contexts/AuthContext';
import { colors } from '@/colors/Colors';

import HomeClient from '../screens/client/HomeClient';
import RadarScreen from '../screens/professional/RadarScreen';
import MyServicesScreen from '../screens/professional/MyServicesScreen'; 
import ProfileRoutes from './profile.routes';
import ProfessionalPortfolio from '../screens/professional/ProfessionalPortfolio';

const AppTab = createBottomTabNavigator();

export default function AppRoutes() {
  const { role } = useAuth();

  return (
    <AppTab.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarStyle: {
          marginBottom: 40,
          paddingBottom: 5,
          height: 60,
          backgroundColor: colors.surface,
          borderTopColor: '#E5E7EB',
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any;

          if (route.name === 'Início' || route.name === 'Radar') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Serviços') {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Portfólio') {
            iconName = focused ? 'images' : 'images-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {role === 'PROFESSIONAL' ? (
        <>
          <AppTab.Screen 
            name="Radar" 
            component={RadarScreen} 
            options={{ title: 'Radar' }}
          />
          <AppTab.Screen 
            name="Serviços" 
            component={MyServicesScreen} 
            options={{ title: 'Serviços' }}
          />
          <AppTab.Screen 
            name="Portfólio" 
            component={ProfessionalPortfolio} 
            options={{ title: 'Portfólio' }}
          />
        </>
      ) : (
        <AppTab.Screen 
          name="Início" 
          component={HomeClient} 
          options={{ title: 'Solicitar' }}
        />
      )}
      
      <AppTab.Screen 
        name="Perfil" 
        component={ProfileRoutes}
      />
    </AppTab.Navigator>
  );
}