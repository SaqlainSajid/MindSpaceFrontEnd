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
