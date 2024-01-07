import apiClient from "./apiClient";

//gets all the topics
const endpoint1 = "/posts/topics";
const getTopics = () => apiClient.get(endpoint1);

//gets all posts for a given topic
const endpoint2 = "/posts/topics/";
const getPosts = (topicName) => apiClient.get(`${endpoint2}/${topicName}`);

//adds a like to a given post
const endpoint3 = "/posts/likes";
const addLike = (id) => apiClient.patch(`${endpoint3}/${id}`);

//removes a like to a given post
const endpoint4 = "/posts/unlikes";
const removeLike = (id) => apiClient.patch(`${endpoint4}/${id}`);

export default { getTopics, getPosts, addLike, removeLike };
