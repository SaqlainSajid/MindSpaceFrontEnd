import { create } from "apisauce";

const apiClient = create({
  baseURL: "https://mindspace-backend-4bec1331aedc.herokuapp.com/",
});

export default apiClient;
