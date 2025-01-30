import type { UseQueryResult } from 'react-query';
import { useQuery } from 'react-query';
import { api } from '@/lib/api';

export function useGet<T>(endpoint: string, key?: string): UseQueryResult<T> {
  return useQuery<T>(key || endpoint, async (): Promise<T> => {
    const response = await api.get(endpoint);
    return response.data;
  });
}
