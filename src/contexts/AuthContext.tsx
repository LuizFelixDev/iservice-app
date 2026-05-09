import React, { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import api from '../services/api';

interface AuthContextData {
  signed: boolean;
  user: any | null;
  role: 'USER' | 'PROFESSIONAL' | null;
  switchRole(newRole: 'USER' | 'PROFESSIONAL'): void;
  updateUser(userData: any): void;
  signIn(credentials: object): Promise<void>;
  register(data: object): Promise<void>;
  signInWithGoogle(token: string): Promise<void>;
  signOut(): void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState<'USER' | 'PROFESSIONAL' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storageToken = await SecureStore.getItemAsync('user_token');
      const storageRole = await SecureStore.getItemAsync('user_role') as any;

      if (storageToken) {
        setRole(storageRole);
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  async function handleAuthResponse(response: any) {
    const { token, user: userData } = response.data;

    let initialRole = 'USER';
    if (userData?.roles) {
      if (userData.roles.includes('PROFESSIONAL') || userData.roles.some((r: any) => r.name === 'PROFESSIONAL')) {
        initialRole = 'PROFESSIONAL';
      }
    }

    setUser(userData);
    setRole(initialRole as any);

    await SecureStore.setItemAsync('user_token', token);
    await SecureStore.setItemAsync('user_role', initialRole);
  }

  function switchRole(newRole: 'USER' | 'PROFESSIONAL') {
    setRole(newRole);
    SecureStore.setItemAsync('user_role', newRole);
  }

  function updateUser(userData: any) {
    setUser(userData);
    if (userData?.roles) {
      const isProf = userData.roles.includes('PROFESSIONAL') || userData.roles.some((r: any) => r.name === 'PROFESSIONAL');
      if (isProf) {
        switchRole('PROFESSIONAL');
      }
    }
  }

  async function signIn(credentials: object) {
    const response = await api.post('/auth/login', credentials);
    await handleAuthResponse(response);
  }

  async function register(data: object) {
    await api.post('/auth/register', data);
  }

  async function signInWithGoogle(token: string) {
    const response = await api.post('/auth/google/mobile', { token });
    await handleAuthResponse(response);
  }

  function signOut() {
    SecureStore.deleteItemAsync('user_token');
    SecureStore.deleteItemAsync('user_role');
    setUser(null);
    setRole(null);
  }

  return (
    <AuthContext.Provider value={{ 
      signed: !!user, 
      user, 
      role,
      switchRole,
      updateUser,
      signIn, 
      register, 
      signInWithGoogle, 
      signOut, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);