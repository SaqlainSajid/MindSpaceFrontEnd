import apiClient from "./apiClient";

const endpoint = "/audio-files";
const getAudios = () => apiClient.get(endpoint);

export default { getAudios };
