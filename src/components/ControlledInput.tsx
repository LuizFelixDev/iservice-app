import React from 'react';
import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { Input } from './Input';
import { ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface ControlledInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  isPassword?: boolean;
  iconName?: keyof typeof Feather.glyphMap;
  containerStyle?: ViewStyle;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export function ControlledInput<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  isPassword,
  iconName,
  containerStyle,
  keyboardType = 'default',
  autoCapitalize = 'none',
}: ControlledInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <Input
          label={label}
          placeholder={placeholder}
          isPassword={isPassword}
          iconName={iconName}
          containerStyle={containerStyle}
          value={value as string}
          onChangeText={onChange}
          onBlur={onBlur}
          error={error?.message}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
      )}
    />
  );
}
