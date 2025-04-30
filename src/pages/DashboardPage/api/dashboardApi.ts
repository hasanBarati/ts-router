import apiClient from '@/shared/lib/apiClient';
import type { Item } from '../types/itemTypes';


// export const fetchItems = async () => {
//   const response = await apiClient.get<Item[]>('/items');
//   return response.data;
// };



export type User = {
  id: number
  name: string
}

export const fetchUsers = async (): Promise<User[]> => {
  return await fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json())
}