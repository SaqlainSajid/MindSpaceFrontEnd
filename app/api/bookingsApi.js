import apiClient from "./apiClient";

//gets all bookings of a doctor on a specific date
const endpoint1 = "/bookings";
const getDocDateBookings = (docId, date) =>
  apiClient.get(`${endpoint1}/doc/${docId}/date/${date}`);

export default { getDocDateBookings };

//adds times to availabilities of a doctor
