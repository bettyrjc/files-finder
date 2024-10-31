import httpClient from "src/shared/httpClient";


export const getKnowledgeBaseService = async () => {
  return await httpClient
    .get(`/knowledge_bases`)
    .then((res) => res.data);
};

export const getFilesListKnowledgeBaseService  = async (id: string, resource:string = "%2F") => {
  return await httpClient
    .get(`/knowledge_bases/${id}/resources/children?resource_path=${resource}`)
    .then((res) => res.data);
}