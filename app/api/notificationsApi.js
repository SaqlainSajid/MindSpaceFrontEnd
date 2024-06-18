import apiClient from "./apiClient";

const endpoint = "/pushTokens";
const register = (pushToken, userId) =>
  apiClient.post(endpoint, { token: pushToken, userId: userId });

const endpoint1 = "/storeNotifs";
const store = (notification, userId) =>
  apiClient.post(endpoint1, { notification: notification, userId: userId });

export default { register, store };
