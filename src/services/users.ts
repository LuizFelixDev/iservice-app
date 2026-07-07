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
    isOnline?: boolean;

    location?: {
      type: string;
      coordinates: number[];
    };
  };
}

export interface PortfolioHighlights {
  yearsOfExperience?: number | string;
  averageResponseTime?: string;
  completedJobs?: number | string;
  [key: string]: any;
}

export interface Certificate {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface PortfolioResponseDto {
  id: string;
  name: string;
  roleTitle?: string;
  bio?: string;
  avatarUrl?: string;
  coverUrl?: string;
  rating: number;
  reviewsCount: number;
  isOnline?: boolean;
  highlights?: PortfolioHighlights;
  certificates: Certificate[];
  portfolioItems: PortfolioItem[];
}

export const usersService = {
  updateProfile: async (data: UpdateProfileDto): Promise<UserResponseDto> => {
    const response = await api.patch('/users/profile', data);
    return response.data;
  },

  updateStatus: async (isOnline: boolean): Promise<any> => {
    const response = await api.patch('/users/me/status', { isOnline });
    return response.data;
  },

  getMe: async (): Promise<UserResponseDto> => {
    const response = await api.get('/users/me');
    return response.data;
  },

  getPortfolio: async (id: string): Promise<PortfolioResponseDto> => {
    const response = await api.get(`/users/professionals/${id}/portfolio`);
    return response.data;
  },

  updatePortfolio: async (data: any): Promise<any> => {
    const response = await api.patch('/users/me/portfolio', data);
    return response.data;
  },

  addPortfolioItem: async (data: any): Promise<PortfolioItem> => {
    const response = await api.post('/users/me/portfolio/items', data);
    return response.data;
  },

  addCertificate: async (data: any): Promise<Certificate> => {
    const response = await api.post('/users/me/certificates', data);
    return response.data;
  },

  deleteAccount: async (): Promise<{ message: string }> => {
    const response = await api.delete('/users/me');
    return response.data;
  },
};
