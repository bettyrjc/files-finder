import httpClient from "src/shared/httpClient";


export const getKnwoledgeBaseService = async () => {
  return await httpClient
    .get(`/knowledge_bases`)
    .then((res) => res.data);
};
