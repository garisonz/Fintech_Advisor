import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const fetchHello = async () => {
  const response = await api.get('/hello/');
  return response.data;
};

export default api;