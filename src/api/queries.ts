import { useQuery } from '@tanstack/react-query';
import { type Track } from '../types';

const rootUrl = 'https://cms.samespace.com';

export function useSongs() {
  return useQuery({
    queryKey: ['songs'],
    queryFn: async () => {
      const response = await fetch(`${rootUrl}/items/songs`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { data } = (await response.json()) as { data: Track[] };
      return data;
    },
  });
}
