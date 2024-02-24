import apiClient from "./apiClient";

//given a doctor Id and a date, retrieves all bookings of that doctor on that date
const endpoint1 = "/bookings";
const getBookings = (docId, date) =>
  apiClient.get(`${endpoint1}/${docId}/${date}`);

//adds a new booking to the database
const addBooking = (bookingData) => apiClient.post(endpoint1, bookingData);

export default {
  getBookings,
  addBooking,
};
