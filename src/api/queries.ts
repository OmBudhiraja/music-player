import { useQuery } from '@tanstack/react-query';
import { type Track } from '../types';
import { baseUrl } from '../utils/constants';

export function useSongs() {
  return useQuery({
    queryKey: ['songs'],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/items/songs`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { data } = (await response.json()) as { data: Track[] };
      return data;
    },
  });
}
