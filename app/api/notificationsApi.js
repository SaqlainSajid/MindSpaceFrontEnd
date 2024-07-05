import apiClient from "./apiClient";

const endpoint = "/pushTokens";
const register = (pushToken, userId) =>
  apiClient.post(endpoint, { token: pushToken, userId: userId });

const endpoint1 = "/storeNotifs";
const store = (notification, userId) =>
  apiClient.post(endpoint1, { notification: notification, userId: userId });

const getAll = (userId) => apiClient.get(`${endpoint1}/${userId}`);

const endpoint2 = "/incrementUnreadNotifs";
const increment = (userId) => apiClient.patch(`users/${userId}${endpoint2}`);

const endpoint3 = "/resetUnreadNotifs";
const reset = (userId) => apiClient.patch(`users/${userId}${endpoint3}`);

export default { register, store, increment, reset, getAll };
