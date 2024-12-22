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

const getAllUsers = () => apiClient.get(`${endpoint1}`);

const createUser = (userData) => {
    return apiClient.post(`${endpoint1}/addUser`, userData);
};

const DeleteUser = (userId) => apiClient.delete(`${endpoint1}/${userId}`);

export { getUser, getAllUsers, DeleteUser, createUser, uploadProfilePhoto };
