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
const endpoint8 = "/posts";
const DeletePost = (id) => apiClient.delete(`${endpoint8}/${id}`);

//for adding a comment
const endpoint9 = "/posts/add-comment";
const addCommentToPost = (id, newComment) =>
  apiClient.post(`${endpoint9}/${id}`, newComment);

//for deleting a comment

const endpoint10 = "/posts/delete-comment";
const deleteCommentFromPost = (id, commentId) =>
  apiClient.patch(`${endpoint10}/${id}/${commentId}`);


//for liking a comment
const endpoint11 = "/posts/like-comment";
const likeComment = (id, commentId, userId) =>
  apiClient.patch(`${endpoint11}/${id}/${commentId}/${userId}`);

//for unliking a comment
const endpoint12 = "/posts/unlike-comment";
const unlikeComment = (id, commentId, userId) =>
  apiClient.patch(`${endpoint12}/${id}/${commentId}/${userId}`);


export default {
  getTopics,
  getPosts,
  addLike,
  removeLike,
  checkLike,
  getPost,
  AddPost,
  DeletePost,
  addCommentToPost,
  deleteCommentFromPost,
  likeComment,
  unlikeComment,
};

