import api from './api';

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export const helpService = {
  getFaq: async (): Promise<FaqItem[]> => {
    const response = await api.get('/help/faq');
    return response.data;
  },
};