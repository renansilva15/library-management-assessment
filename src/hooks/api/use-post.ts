import { useMutation } from 'react-query';
import { api } from '@/lib/api';

import type { UseMutationResult } from 'react-query';

export function usePost<T, Req, Err>(
  endpoint: string,
): UseMutationResult<T, Err, Req> {
  return useMutation<T, Err, Req>(async (data: Req): Promise<T> => {
    const response = await api.post(endpoint, data);
    return response.data;
  });
}
