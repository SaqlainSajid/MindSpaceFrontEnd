import apiClient from "./apiClient";

const endpoint = "/rooms";
const getRooms = () => apiClient.get(endpoint);
const getRoom = (roomId) => apiClient.get(`${endpoint}/${roomId}`);

export default { getRooms, getRoom };
