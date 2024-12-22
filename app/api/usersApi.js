import apiClient from "./apiClient";

//gets a given User
const endpoint1 = "/users";
const getUser = (userId) => apiClient.get(`${endpoint1}/${userId}`);


const uploadProfilePhoto = (formData) => {
    return apiClient.post(`${endpoint1}/profile-photo`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};

export default { getUser, uploadProfilePhoto };

const getAllUsers = () => apiClient.get(`${endpoint1}`);

/*const DeleteUser = async (userId) => {
    console.log("DeleteUser API called with ID:", userId); // Add logging
    return await apiClient.delete(`${endpoint1}/${userId}`);
  };*/
  
const DeleteUser = (userId) => apiClient.delete(`${endpoint1}/${userId}`);


export { getUser, getAllUsers, DeleteUser };


