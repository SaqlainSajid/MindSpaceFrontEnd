import apiClient from "./apiClient";

//gets all the topics
const endpoint1 = "/posts/topics";
const getTopics = () => apiClient.get(endpoint1);

//gets all posts for a given topic
const endpoint2 = "/posts/topics/";
const getPosts = (topicName) => apiClient.get(`${endpoint2}/${topicName}`);

//adds a like to a given post and adds the current user to the list of users who liked the post
const endpoint3 = "/posts/likes";
const addLike = (id, user) => apiClient.patch(`${endpoint3}/${id}/${user}`);

//removes a like to a given post and removes the current user to the list of users who liked the post
const endpoint4 = "/posts/unlikes";
const removeLike = (id, user) => apiClient.patch(`${endpoint4}/${id}/${user}`);

//checks if a post has been liked by current user
const endpoint5 = "/posts/check-like";
const checkLike = (id, user) => apiClient.get(`${endpoint5}/${id}/${user}`);

//finds a post with a specific id
const endpoint6 = "/posts";
const getPost = (id) => apiClient.get(`${endpoint6}/${id}`);

//adds a post
const endpoint7 = "/posts";
const AddPost = (postData) => apiClient.post(endpoint7, postData);

//for delete post
const endpoint8 = "/posts"
const DeletePost = (id) => apiClient.delete(`${endpoint6}/${id}`);

export default { getTopics, getPosts, addLike, removeLike, checkLike, getPost, AddPost, DeletePost };
