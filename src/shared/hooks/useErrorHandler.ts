import { useCallback } from 'react';
// import { toast } from 'react-toastify';

export const useErrorHandler = () => {
  return useCallback((error: any) => {
    // toast.error(error.message || 'An error occurred');
  }, []);
};
