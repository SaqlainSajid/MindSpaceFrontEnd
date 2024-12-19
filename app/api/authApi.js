import apiClient from './apiClient';

const endpoint = '/auth';
const login = (email, password) =>
  apiClient.post(endpoint, { email, password });

const endpoint1 = '/auth/signUp';
const register = (name, email, password) =>
  apiClient.post(endpoint1, { name, email, password });

const endpoint2 = '/auth/changePassword';
const changePassword = (userId, currentPassword, newPassword) =>
  apiClient.post(endpoint2, { userId, currentPassword, newPassword });

export default { login, register, changePassword };
