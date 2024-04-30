import apiClient from "./apiClient";

const endpoint = "/messages";
const getMessages = (roomId) => apiClient.get(`${endpoint}/${roomId}`);

export default { getMessages };
