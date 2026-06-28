import api from './api';

export interface UpdateProfileDto {
  bio?: string;
  phoneNumber?: string;
  document?: string;
  photoUrl?: string;
  latitude?: number;
  longitude?: number;
}

export interface UserResponseDto {
  id: string;
  email: string;

  firstName: string;
  lastName: string;

  roles: string[];

  profile?: {
    bio?: string;
    phoneNumber?: string;
    document?: string;
    photoUrl?: string;

    location?: {
      type: string;
      coordinates: number[];
    };
  };
}

export const usersService = {
  updateProfile: async (data: UpdateProfileDto): Promise<UserResponseDto> => {
    const response = await api.patch('/users/profile', data);
    return response.data;
  },

  getMe: async (): Promise<UserResponseDto> => {
    const response = await api.get('/users/me');
    return response.data;
  },
};
