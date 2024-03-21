import apiClient from "./apiClient";

const endpoint1 = "/doctors";
const getDoctors = () => apiClient.get(endpoint1);

const endpoint2 = "/doctors";
const getDoctor = (id) => apiClient.get(`${endpoint2}/${id}`);

const endpoint3 = "/doctors/settings";
const changeBookingSettings = (id, data) =>
  apiClient.patch(`${endpoint2}/${id}`, data);

const endpoint4 = "/doctors/addAvailability";
const setDocAvailability = (docId, date, availability) =>
  apiClient.patch(`${endpoint4}/${docId}/${date}`, availability);

const endpoint5 = "/doctors/availability";
const getDocAvailability = (docId, date) =>
  apiClient.get(`${endpoint5}/${docId}/${date}`);

export default {
  getDoctors,
  getDoctor,
  changeBookingSettings,
  setDocAvailability,
  getDocAvailability,
};
