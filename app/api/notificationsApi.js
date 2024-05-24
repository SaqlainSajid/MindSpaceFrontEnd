import apiClient from "./apiClient";

const endpoint = "/pushTokens";
const register = (pushToken, userId) =>
  apiClient.post(endpoint, { token: pushToken, userId: userId });

export default { register };
