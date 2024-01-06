import apiClient from "./apiClient";

//gets all the topics
const endpoint1 = "/posts/topics";
const getTopics = () => apiClient.get(endpoint1);

//gets all posts for a given topic
const endpoint2 = "/posts/topics/";
const getPosts = (topicName) => apiClient.get(`${endpoint2}/${topicName}`);

export default { getTopics, getPosts };
