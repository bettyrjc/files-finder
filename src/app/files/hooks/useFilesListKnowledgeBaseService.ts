import { useQuery } from "@tanstack/react-query";
import { getFilesListKnowledgeBaseService } from "../services/getKnowledgeBase";

export const useFilesListKnowledgeBasesService = (id: string) => {
  return useQuery({
    queryKey: ["knowledge_files"],
    queryFn: async () => {
      if (id === "") return null;
      return getFilesListKnowledgeBaseService(id);
    },
    enabled: id !== "",
  });
};
