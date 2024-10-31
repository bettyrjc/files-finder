import axios, { AxiosRequestConfig } from 'axios';

// import { cleanAuthCookies } from '@utils/cookies';

function getApiUrl() {
  console.log("process.env.API_URL", process.env.API_URL)
  const url = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'https://api.stack-ai.com';
  return `${url}`;
}


const getInstance = (config?: AxiosRequestConfig) => {
  return axios.create({
    baseURL: '/',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    ...config,
  });
};

const httpClient = getInstance({
  baseURL: getApiUrl(),
});

export default httpClient;
