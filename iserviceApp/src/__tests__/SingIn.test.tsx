import React from 'react';
import { render } from '@testing-library/react-native';
import SingIn from '../Screens/SingIn/SingIn';

describe('SingIn Screen', () => {
  it('deve renderizar todos os campos de cadastro', () => {
    const { getByPlaceholderText, getByText } = render(<SingIn />);
    
    expect(getByPlaceholderText(/nome/i)).toBeTruthy();
    expect(getByPlaceholderText(/email/i)).toBeTruthy();
    expect(getByPlaceholderText(/senha/i)).toBeTruthy();
    expect(getByText(/cadastrar/i)).toBeTruthy();
  });
});