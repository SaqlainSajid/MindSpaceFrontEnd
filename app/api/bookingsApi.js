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
const getDocConfirmedBookings = (docId) =>
  apiClient.get(`${endpoint1}/confirmed/doc/${docId}`);
const getUserPastBookings = (userId) =>
  apiClient.get(`${endpoint1}/previous/${userId}`);
const getDocPendingBookings = (docId) =>
  apiClient.get(`${endpoint1}/pending/doc/${docId}`);

const getAdminConfirmedBookings = () => 
  apiClient.get(`${endpoint1}/confirmed`);
const getAdminPreviousBookings=()=> 
  apiClient.get(`${endpoint1}/previous`);
const getAdminPendingBookings=()=>
  apiClient.get(`${endpoint1}/pending`);
const DenyBooking=(id)=>
  apiClient.post(`${endpoint1}/deny/${id}`)
const confirmBooking=(id)=>
  apiClient.put(`${endpoint1}/confirm/${id}`)//used post instead of put to ensure notifications--Arqam

const deleteAll = (userId) => apiClient.delete(`${endpoint1}/deleteBookings/${userId}`);


export default {
  getDocDateBookings,
  setBooking,
  getUserPendingBookings,
  getDocConfirmedBookings,
  getDocPendingBookings,
  getUserConfirmedBookings,
  getUserPastBookings,
  getAdminConfirmedBookings,
  getAdminPreviousBookings,
  getAdminPendingBookings,
  confirmBooking,
  DenyBooking,
  deleteAll
};

//adds times to availabilities of a doctor
