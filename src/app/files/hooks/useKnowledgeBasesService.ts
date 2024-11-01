import { useQuery } from '@tanstack/react-query';
import { getKnowledgeBaseService } from '../services/getKnowledgeBase';

export const useKnowledgeBasesService = (isAuthenticated: boolean) => {
  return useQuery({
    queryKey: ['knowledge'],
    queryFn: async () => {
      return getKnowledgeBaseService();
    },
    enabled: isAuthenticated,
  });
};
