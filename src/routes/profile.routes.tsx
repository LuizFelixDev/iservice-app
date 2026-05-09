import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileScreen from '../screens/shared/ProfileScreen';
import UpdateProfileScreen from '../screens/shared/UpdateProfileScreen';

const ProfileStack = createStackNavigator();

export default function ProfileRoutes() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
      <ProfileStack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
    </ProfileStack.Navigator>
  );
}
