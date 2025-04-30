import apiClient from '@/shared/lib/apiClient';
import type { UserFormData } from '../types/userFormTypes';


export const submitUserForm = async (data: UserFormData) => {
  const response = await apiClient.post('/users', data);
  return response.data;
};
