import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { Alert } from 'react-native';
import ProfileScreen from './ProfileScreen';
import { useAuth } from '@/contexts/AuthContext';
import { usersService } from '@/services/users';

// Mock dependencies
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

jest.mock('expo-constants', () => ({
  expoConfig: {
    hostUri: 'localhost:8404',
  },
}));

jest.mock('@expo/vector-icons', () => ({
  MaterialCommunityIcons: 'MaterialCommunityIcons',
}));

jest.mock('@/contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

jest.mock('@/components', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return {
    Screen: ({ children }: any) => <View>{children}</View>,
    Typography: ({ children, style, ...rest }: any) => <Text style={style} {...rest}>{children}</Text>,
    Spacer: () => null,
    Button: ({ title }: any) => <Text>{title}</Text>,
  };
});

jest.mock('@/services/users', () => ({
  usersService: {
    deleteAccount: jest.fn(),
  },
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
}));

describe('ProfileScreen - Account Deletion', () => {
  const mockSignOut = jest.fn();
  const mockSwitchRole = jest.fn();
  
  const mockAuthData = {
    signOut: mockSignOut,
    switchRole: mockSwitchRole,
    user: {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      roles: ['USER'],
    },
    role: 'USER' as const,
    signed: true,
    loading: false,
    register: jest.fn(),
    signIn: jest.fn(),
    signInWithGoogle: jest.fn(),
    updateUser: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue(mockAuthData);
  });

  it('renders correctly and shows delete account button', () => {
    const { getByTestId, getByText } = render(<ProfileScreen />);
    
    expect(getByTestId('delete-account-button')).toBeTruthy();
    expect(getByText('Excluir Minha Conta')).toBeTruthy();
  });

  it('shows confirmation Alert when delete button is pressed', () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    const { getByTestId } = render(<ProfileScreen />);
    
    fireEvent.press(getByTestId('delete-account-button'));
    
    expect(alertSpy).toHaveBeenCalledWith(
      'Excluir Conta',
      'Tem certeza de que deseja excluir sua conta? Esta ação é irreversível.',
      expect.any(Array)
    );
  });

  it('does not delete account if cancel is pressed in the confirmation alert', () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    const deleteAccountSpy = jest.spyOn(usersService, 'deleteAccount');
    const { getByTestId } = render(<ProfileScreen />);
    
    fireEvent.press(getByTestId('delete-account-button'));
    
    // Retrieve Cancel button
    const buttons = alertSpy.mock.calls[0][2];
    const cancelButton = buttons?.find(b => b.text === 'Cancelar');
    
    expect(cancelButton).toBeTruthy();
    const onCancel = cancelButton?.onPress;
    if (onCancel) {
      act(() => {
        onCancel();
      });
    }
    
    expect(deleteAccountSpy).not.toHaveBeenCalled();
    expect(mockSignOut).not.toHaveBeenCalled();
  });

  it('calls deleteAccount API and signs out on confirmation success', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    const deleteAccountSpy = jest.spyOn(usersService, 'deleteAccount').mockResolvedValueOnce({ message: 'Success' });
    const { getByTestId } = render(<ProfileScreen />);
    
    fireEvent.press(getByTestId('delete-account-button'));
    
    const buttons = alertSpy.mock.calls[0][2];
    const confirmButton = buttons?.find(b => b.text === 'Excluir');
    
    expect(confirmButton).toBeTruthy();
    
    // Simulate confirming deletion
    const onConfirm = confirmButton?.onPress;
    if (onConfirm) {
      await act(async () => {
        await onConfirm();
      });
    }
    
    expect(deleteAccountSpy).toHaveBeenCalled();
    
    // Should show success alert
    await waitFor(() => {
      expect(alertSpy).toHaveBeenLastCalledWith(
        'Sucesso',
        'Sua conta foi excluída com sucesso.',
        expect.any(Array)
      );
    });

    // Simulate clicking OK on success alert
    const successButtons = alertSpy.mock.calls[1][2];
    const okButton = successButtons?.find(b => b.text === 'OK');
    expect(okButton).toBeTruthy();
    const onOk = okButton?.onPress;
    if (onOk) {
      act(() => {
        onOk();
      });
    }

    expect(mockSignOut).toHaveBeenCalled();
  });

  it('shows error Alert if deleteAccount API fails', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert');
    const deleteAccountSpy = jest.spyOn(usersService, 'deleteAccount').mockRejectedValueOnce(new Error('Network Error'));
    const { getByTestId } = render(<ProfileScreen />);
    
    fireEvent.press(getByTestId('delete-account-button'));
    
    const buttons = alertSpy.mock.calls[0][2];
    const confirmButton = buttons?.find(b => b.text === 'Excluir');
    
    const onConfirmFail = confirmButton?.onPress;
    if (onConfirmFail) {
      await act(async () => {
        await onConfirmFail();
      });
    }
    
    expect(deleteAccountSpy).toHaveBeenCalled();
    
    await waitFor(() => {
      expect(alertSpy).toHaveBeenLastCalledWith(
        'Erro',
        'Falha ao excluir a conta. Tente novamente.'
      );
    });
    
    expect(mockSignOut).not.toHaveBeenCalled();
  });
});
