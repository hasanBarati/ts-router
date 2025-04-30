// import { useQuery } from '@tanstack/react-query';
// import { fetchItems } from '../api/dashboardApi';
// import { useDashboardStore } from '../model/dashboardStore';
// import { useErrorHandler } from '@/shared/hooks/useErrorHandler';

// export const useDashboard = () => {
//   const { setItems, items } = useDashboardStore();
//   const errorHandler = useErrorHandler();
  
//   const query = useQuery({
//     queryKey: ['items'], 
//     queryFn: fetchItems,
//     onSuccess: data => setItems(data),
//     onError: errorHandler
//   });

//   return { ...query, items };
// };