import api from './api';

export type JobStatus =
  | 'searching'
  | 'negotiating'
  | 'accepted'
  | 'completed'
  | 'canceled';

export interface Job {
  id: string;
  description: string;
  status: JobStatus;

  professional?: {
    id: string;
    firstName: string;
    lastName: string;
  } | null;

  client?: {
    id: string;
  } | null;
}

export interface CreateJobDto {
  description: string;
  latitude: number;
  longitude: number;
}

export const jobsService = {
  async getMyJobs(): Promise<Job[]> {
    const response = await api.get('/jobs/my-jobs');
    return response.data;
  },

  async createJob(data: CreateJobDto): Promise<Job> {
    const response = await api.post('/jobs', data);
    return response.data;
  },

  async cancelJob(id: string): Promise<void> {
    await api.patch(`/jobs/${id}/cancel`);
  },

  async getRadarJobs(latitude: number, longitude: number, radius: number = 10000): Promise<Job[]> {
    const response = await api.get('/jobs/radar', {
      params: { latitude, longitude, radius }
    });
    return response.data;
  },

  async acceptJob(id: string): Promise<void> {
    await api.patch(`/jobs/${id}/accept`);
  },

  async completeJob(id: string): Promise<void> {
    await api.patch(`/jobs/${id}/complete`);
  },

  async getMyServices(): Promise<Job[]> {
    const response = await api.get('/jobs/my-services');
    return response.data;
  },
};