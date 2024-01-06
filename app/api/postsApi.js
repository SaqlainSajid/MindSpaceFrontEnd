import apiClient from "./apiClient";

const endpoint = "/posts/topics";
const getTopics = () => apiClient.get(endpoint);

export default { getTopics };
