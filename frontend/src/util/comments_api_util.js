import axios from "axios";

export const requestComments = petId => {
  return axios.get(`/api/comments/${petId}`)
};

export const createComment = (petId, data) => {
  return axios.post(`/api/comments/${petId}`, data)
};

export const editComment = (commentId, data) => {
  return axios.patch(`/api/comments/${commentId}`, data)
};

export const deleteComment = (commentId) => {
  return axios.delete(`/api/comments/${commentId}`)
};