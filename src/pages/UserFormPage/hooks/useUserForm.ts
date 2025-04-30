import { useMutation } from '@tanstack/react-query';

import { useErrorHandler } from '@/shared/hooks/useErrorHandler';
import { submitUserForm } from '../api/userFormApi';


export const useUserForm = () => {
  const errorHandler = useErrorHandler();
  return useMutation(submitUserForm, { onError: errorHandler });
};
