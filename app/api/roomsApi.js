import apiClient from "./apiClient";

const endpoint = "/rooms";
const getRooms = () => apiClient.get(endpoint);

export default { getRooms };
