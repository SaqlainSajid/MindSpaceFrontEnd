import apiClient from "./apiClient";

const endpoint = "/auth";
const login = (email, password) =>
  apiClient.post(endpoint, { email, password });

export default { login };
