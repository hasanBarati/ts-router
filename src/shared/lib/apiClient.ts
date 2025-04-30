import axios from 'axios';

const apiClient = axios.create({ baseURL: 'https://api.example.com', timeout: 5000 });

apiClient.interceptors.request.use(config => {
  // Add auth token or logging
  return config;
}, error => Promise.reject(error));

apiClient.interceptors.response.use(response => response, error => {
  // Global error handling
  return Promise.reject(error);
});

export default apiClient;
