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
};