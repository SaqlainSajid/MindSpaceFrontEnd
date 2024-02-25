import apiClient from "./apiClient";

//given a doctor Id and a date, retrieves all bookings of that doctor on that date
const endpoint1 = "/bookings";
const getBookings = (docId, date) =>
  apiClient.get(`${endpoint1}/doc/${docId}/date/${date}`);

//given a userId retrieves all upcoming bookings of that user
const getUserBookings = (userId) => apiClient.get(`${endpoint1}/${userId}`);

//given a docId retrieves all upcoming bookings of that doc
const getDoctorBookings = (docId) => apiClient.get(`${endpoint1}/doc/${docId}`);

//adds a new booking to the database
const addBooking = (bookingData) => apiClient.post(endpoint1, bookingData);

//deletes a booking
const delBooking = (bookingId) => apiClient.delete(`${endpoint1}/${bookingId}`);

export default {
  getBookings,
  addBooking,
  delBooking,
  getUserBookings,
  getDoctorBookings,
};
