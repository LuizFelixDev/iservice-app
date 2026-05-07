import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Login from '../Screens/Login/Login';

describe('Login Screen', () => {
  it('deve renderizar os campos de email e senha', () => {
    const { getByPlaceholderText } = render(<Login />);
    
    expect(getByPlaceholderText(/email/i)).toBeTruthy();
    expect(getByPlaceholderText(/senha/i)).toBeTruthy();
  });

  it('deve permitir digitar no campo de email', () => {
    const { getByPlaceholderText } = render(<Login />);
    const emailInput = getByPlaceholderText(/email/i);
    
    fireEvent.changeText(emailInput, 'usuario@teste.com');
    expect(emailInput.props.value).toBe('usuario@teste.com');
  });

  it('deve exibir o botão de login', () => {
    const { getByText } = render(<Login />);
    expect(getByText(/entrar/i)).toBeTruthy();
  });
});