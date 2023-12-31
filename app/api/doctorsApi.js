import apiClient from "./apiClient";

const endpoint = "/doctors";
const getDoctors = () => apiClient.get(endpoint);

export default { getDoctors };
