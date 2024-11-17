import apiClient from './apiClient';

const endpoint = '/auth';
const login = (email, password) =>
  apiClient.post(endpoint, { email, password });

const endpoint1 = '/auth/signUp';
const register = (name, email, password) =>
  apiClient.post(endpoint1, { name, email, password });

export default { login, register };
