import apiClient from "./apiClient";

//gets a given User
const endpoint1 = "/users";
const getUser = (userId) => apiClient.get(`${endpoint1}/${userId}`);

export default { getUser };
