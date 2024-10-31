import httpClient from "src/shared/httpClient";


export const getKnowledgeBaseService = async () => {
  return await httpClient
    .get(`/knowledge_bases`)
    .then((res) => res.data);
};

export const getFilesListKnowledgeBaseService  = async (id: string) => {
  return await httpClient
    .get(`/knowledge_bases/${id}/resources/children?resource_path=%2F`)
    .then((res) => res.data);
}