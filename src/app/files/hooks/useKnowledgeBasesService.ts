import { useQuery } from '@tanstack/react-query';
import { getKnwoledgeBaseService } from '../services/getKnowledgeBase';

export const useKnowledgeBasesService = () => {
  return useQuery({
    queryKey: ['knowledge'],
    queryFn: async () => {
      return getKnwoledgeBaseService();
    }
  });
};
