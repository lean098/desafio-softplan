import axios, { AxiosRequestConfig } from 'axios';

// Constants
import ENVIRONMENTS from 'constants/enviroments';

const apiBase = axios.create({
  baseURL: ENVIRONMENTS.USERS_API.BASE_URL,
});

const callApiBase = (
  call: AxiosRequestConfig & {
    endpoint: string;
    method: AxiosRequestConfig;
    params?: {};
    data?: any;
    headers?: {};
    showJSON?: boolean;
    showConsoleLog?: boolean;
    title?: string;
  },
) => {
  const { endpoint, method = 'GET', params = {}, data = {} } = call;

  if (method === 'GET' || method === 'DELETE') {
    return apiBase(endpoint, {
      params: {
        ...params,
      },
      method,
    });
  }

  let body = {
    method,
    params: {},
    data,
  };

  return apiBase(endpoint, body);
};

export default callApiBase;
