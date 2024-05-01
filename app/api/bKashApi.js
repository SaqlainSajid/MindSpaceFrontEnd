import apiClient from "./apiClient";

//gets the bKash URL of create payment
const endpoint1 = "/bKash";
const getURL = (amount, orderId) =>
  apiClient.post(`${endpoint1}/${amount}/${orderId}`);

export default { getURL };

//adds times to availabilities of a doctor
