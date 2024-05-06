import apiClient from "./apiClient";

//gets all bookings of a doctor on a specific date
const endpoint1 = "/bookings";
const getDocDateBookings = (docId, date) =>
  apiClient.get(`${endpoint1}/doc/${docId}/date/${date}`);

const setBooking = (booking) => apiClient.post(endpoint1, booking);
const getUserPendingBookings = (userId) =>
  apiClient.get(`${endpoint1}/pending/${userId}`);
const getUserConfirmedBookings = (userId) =>
  apiClient.get(`${endpoint1}/confirmed/${userId}`);
const getUserPastBookings = (userId) =>
  apiClient.get(`${endpoint1}/previous/${userId}`);

export default {
  getDocDateBookings,
  setBooking,
  getUserPendingBookings,
  getUserConfirmedBookings,
  getUserPastBookings,
};

//adds times to availabilities of a doctor
