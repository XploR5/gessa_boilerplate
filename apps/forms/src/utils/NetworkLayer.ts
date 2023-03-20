import axios, { AxiosResponse } from 'axios';
import { getLocalStorage } from './localStorageService';

const instance = axios.create();

instance.interceptors.request.use(
  (request: any) => {
    const authToken = getLocalStorage('userInfo').sessionKey
      ? getLocalStorage('userInfo').sessionKey
      : '';
    const projectId = getLocalStorage('userInfo').projectId
      ? getLocalStorage('userInfo').projectId
      : '';
    request.headers.common['Authorization'] = `Bearer ${authToken}`;
    request.headers.common['x-tenant-id'] = projectId || '';
    return request;
  },
  (error) => {
    console.log(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: any) => {
    const status = error.response?.status || 500;
    switch (status) {
      case 401:
        // setLocalStorage('logout', true);
        break;
      case 404:
        break;
      case 500:
        break;
      default:
        break;
    }
    return error;
  }
);
export default instance;
