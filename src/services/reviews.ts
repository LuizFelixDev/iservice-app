import api from './api';
import * as SecureStore from 'expo-secure-store';

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  reviewer: {
    id: string;
    firstName: string;
    lastName: string;
    picture?: string;
  };
}

export interface UserReviewsSummary {
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
}

export const reviewsService = {
  createReview: async (jobId: string, rating: number, comment?: string): Promise<void> => {
    await api.post('/reviews', { jobId, rating, comment });
  },

  getUserReviews: async (userId: string): Promise<UserReviewsSummary> => {
    const response = await api.get(`/reviews/user/${userId}`);
    return response.data;
  },

  saveEvaluatedJob: async (jobId: string): Promise<void> => {
    try {
      const stored = await SecureStore.getItemAsync('evaluated_jobs');
      const jobs = stored ? JSON.parse(stored) : [];
      if (!jobs.includes(jobId)) {
        jobs.push(jobId);
        await SecureStore.setItemAsync('evaluated_jobs', JSON.stringify(jobs));
      }
    } catch (e) {
      console.error('Failed to save evaluated job', e);
    }
  },

  getEvaluatedJobs: async (): Promise<string[]> => {
    try {
      const stored = await SecureStore.getItemAsync('evaluated_jobs');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Failed to load evaluated jobs', e);
      return [];
    }
  }
};
