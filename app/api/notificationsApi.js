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

//Make sure to use endpoint1 first, before adding other endpoints
//Since only endpoints that begin with "storeNotifs" will be routed to 
//notifications.js in the backend
const endpoint4 = "/storeNotifs/deleteNotifs";
const deleteAll = (userId) => apiClient.delete(`${endpoint4}/${userId}`);

export default { register, store, increment, reset, getAll, deleteAll }; 

