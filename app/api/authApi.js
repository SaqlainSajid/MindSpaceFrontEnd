import apiClient from "./apiClient";

const endpoint = "/auth";
const login = (email, password) => apiClient.get(endpoint);

export default { login };
