import apiClient from "./apiClient";

const endpoint1 = "/doctors";
const getDoctors = () => apiClient.get(endpoint1);

const endpoint2 = "/doctors";
const getDoctor = (id) => apiClient.get(`${endpoint2}/${id}`);

const endpoint3 = "/doctors/settings";
const changeBookingSettings = (id, data) =>
  apiClient.patch(`${endpoint2}/${id}`, data);

export default { getDoctors, getDoctor, changeBookingSettings };
